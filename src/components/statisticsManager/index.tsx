'use client';

import { AppHabit } from '@/lib/schemas';
import { selectDateTime } from '@/redux/features/datetime/selectors';
import {
  selectActions,
  selectActiveHabits,
} from '@/redux/features/habits/selectors';
import { statisticsActions } from '@/redux/features/statistics';
import { selectStatisticsEntries } from '@/redux/features/statistics/selectors';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { FC, useEffect } from 'react';

export const StatisticsManager: FC = function () {
  const statistics = useAppSelector((state) => selectStatisticsEntries(state));
  type Stat = (typeof statistics)[0];
  const habits = useAppSelector((state) => selectActiveHabits(state));
  let actions = useAppSelector((state) => selectActions(state)).map((i) => i);
  const currentDate =
    useAppSelector((state) => selectDateTime(state, new Date().toString())) ??
    new Date();
  const store = useAppStore();
  const getDateWithNoTime = (d: Date): Date =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const currentDateWithNoTime = getDateWithNoTime(currentDate);
  let checkProgressFromDate = currentDateWithNoTime;
  if (statistics.length) {
    const lastStatistics = statistics.reduce((prev, cur) =>
      Date.parse(prev.date) > Date.parse(cur.date) ? prev : cur
    );
    checkProgressFromDate = new Date(Date.parse(lastStatistics.date));
    checkProgressFromDate.setDate(checkProgressFromDate.getDate() + 1);
  } else if (habits.length) {
    const earliestHabit = habits.reduce((prev, cur) =>
      Date.parse(prev.addDate) < Date.parse(cur.addDate) ? prev : cur
    );
    checkProgressFromDate = getDateWithNoTime(new Date(earliestHabit.addDate));
  }
  if (+checkProgressFromDate == +currentDateWithNoTime) {
    checkProgressFromDate.setHours(12);
  }
  const events: Map<string, { isDone: boolean; habitId: AppHabit['id'] }[]> =
    new Map();
  for (let actionIndex = actions.length - 1; actionIndex >= 0; actionIndex--) {
    const action = actions[actionIndex];
    if (Date.parse(action.date) < +checkProgressFromDate) {
      break;
    }
    if (!events.has(action.date)) {
      events.set(action.date, []);
    }
    events.get(action.date)?.push({ isDone: true, habitId: action.id });
  }
  const getDays = (d: Date): number =>
    Math.floor(+getDateWithNoTime(d) / (1000 * 60 * 60 * 24));
  const daysDelta = getDays(currentDate) - getDays(checkProgressFromDate);
  for (let i = 0; i < daysDelta; i++) {
    const newDate = getDateWithNoTime(checkProgressFromDate);
    newDate.setDate(newDate.getDate() + i);
    const dateString = newDate.toDateString();
    if (!events.has(dateString)) {
      events.set(dateString, []);
    }
    for (const habit of habits) {
      const addDate = new Date(habit.addDate);
      const lap =
        habit.period === 'daily' ? 1 : habit.period === 'weekly' ? 7 : 30;
      const diff = Math.trunc(
        (newDate.getTime() - addDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff < 0 || diff % lap != 0) {
        continue;
      }
      events.get(dateString)?.push({ isDone: false, habitId: habit.id });
    }
  }
  const alreadyDoneHabits: Record<AppHabit['id'], boolean> = {};
  const habitsMapping = habits.reduce(
    (prev: Record<AppHabit['id'], AppHabit>, cur) => {
      prev[cur.id] = cur;
      return prev;
    },
    {}
  );
  const newStats: typeof statistics = [];
  for (const [date, dateEvents] of events.entries()) {
    const stat: Stat = {
      date,
      doneCount: {
        daily: 0,
        weekly: 0,
        monthly: 0,
      },
      missedCount: {
        daily: 0,
        weekly: 0,
        monthly: 0,
      },
    };
    for (const { isDone, habitId } of dateEvents) {
      if (isDone) {
        alreadyDoneHabits[habitId] = true;
        stat.doneCount[habitsMapping[habitId].period]++;
      } else {
        if (!alreadyDoneHabits[habitId]) {
          stat.missedCount[habitsMapping[habitId].period]++;
        }
        alreadyDoneHabits[habitId] = false;
      }
    }
    newStats.push(stat);
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      store.dispatch(statisticsActions.addStatistics(newStats));
    }
    return () => {
      ignore = true;
    };
  });
  return <></>;
};
