import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';
import { openDb } from 'idb';
import type { RootState } from '@/redux/store';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

async function getCurDate(): Promise<Date> {
  const db = await openDb('habit-tracker', 1);
  const tx = db.transaction('habits');
  const obj: RootState = await tx.objectStore('habits').get('persist:root');
  const dti = obj['dateTime'];
  const date = new Date();
  const setDate = new Date(dti.newDateTime);
  const setAt = new Date(dti.setAt);
  const offset = +date - +setAt;
  const res = new Date(+setDate + offset);
  return res;
}

async function notifyMissedHabits() {
  const db = await openDb('habit-tracker', 1);
  const tx = db.transaction('habits');
  const obj: RootState = await tx.objectStore('habits').get('persist:root');
  const curDateTime = await getCurDate();
  let count = 0;
  for (const habit of obj.habits.habits) {
    if (!habit.active) {
      continue;
    }
    const lap =
      habit.period === 'daily' ? 1 : habit.period === 'weekly' ? 7 : 30;
    const habitActions = obj.habits.actions.filter(
      (action) => action.id == habit.id
    );
    if (!habitActions.length) {
      count++;
    } else {
      const lastAction = habitActions.reduce((prev, current) =>
        prev && Date.parse(prev.date) > Date.parse(current.date)
          ? prev
          : current
      );
      const lastActionDate = new Date(Date.parse(lastAction.date));
      if ((+curDateTime - +lastActionDate) / (1000 * 60 * 60 * 24) >= lap) {
        count++;
      }
    }
  }
  await self.registration.showNotification(`Забытые Привычки`, {
    body: `Вы забыли про столько привычек: ${count}`,
  });
}

async function checkToNotify() {
  const curDateTime = await getCurDate();
  if (curDateTime.getHours() == 18) {
    await notifyMissedHabits();
  }
}

async function planNotification() {
  if (Notification.permission == 'granted') {
    const curDateTime = await getCurDate();
    const nextHoursDateTime = new Date(
      curDateTime.getFullYear(),
      curDateTime.getMonth(),
      curDateTime.getDate(),
      curDateTime.getHours() + 1
    );
    const delay = nextHoursDateTime.valueOf() - curDateTime.valueOf();
    setTimeout(async () => {
      await checkToNotify();
      setInterval(checkToNotify, 1 * 60 * 60 * 1000);
    }, delay);
  }
}

self.addEventListener('activate', planNotification);

serwist.addEventListeners();
