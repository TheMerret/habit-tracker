'use client';

import { AppHabitAction } from '@/lib/schemas';
import { gameActions } from '@/redux/features/game';
import { selectActions } from '@/redux/features/habits/selectors';
import { StatisticsState } from '@/redux/features/statistics';
import { selectStatisticsEntries } from '@/redux/features/statistics/selectors';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { FC, useEffect, useRef } from 'react';

export const GameManager: FC = function () {
  return (
    <>
      <MissedHabitsManager />
      <DoneHabitsManager />
    </>
  );
};

const DoneHabitsManager: FC = function () {
  const actions = useAppSelector((state) => selectActions(state));
  const initializedRef = useRef(false);
  const prevActionsRef = useRef<typeof actions>([]);
  if (!initializedRef.current) {
    prevActionsRef.current = actions;
    initializedRef.current = true;
  }
  useEffect(() => {
    prevActionsRef.current = actions;
  }, [actions.length]);
  return (
    <DoneHabitsInnerManager
      actions={actions}
      prevActions={prevActionsRef.current}
    ></DoneHabitsInnerManager>
  );
};

interface DoneHabitsInnerManagerProps {
  actions: AppHabitAction[];
  prevActions: AppHabitAction[];
}

const DoneHabitsInnerManager: FC<DoneHabitsInnerManagerProps> = function ({
  actions,
  prevActions,
}) {
  const store = useAppStore();
  let count = 0;
  count += actions.length - prevActions.length;
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      store.dispatch(gameActions.addCoins(count * 10));
    }
    return () => {
      ignore = true;
    };
  });
  return <></>;
};

const MissedHabitsManager: FC = function () {
  const statistics = useAppSelector((state) => selectStatisticsEntries(state));
  const initializedRef = useRef(false);
  const prevStatsRef = useRef<typeof statistics>([]);
  if (!initializedRef.current) {
    prevStatsRef.current = statistics;
    initializedRef.current = true;
  }
  useEffect(() => {
    prevStatsRef.current = statistics;
  }, [statistics.length]);
  return (
    <MissedHabitsInnerManager
      stats={statistics}
      prevStats={prevStatsRef.current}
    ></MissedHabitsInnerManager>
  );
};

interface MissedHabitsInnerManagerProps {
  stats: StatisticsState['entries'];
  prevStats: StatisticsState['entries'];
}

const MissedHabitsInnerManager: FC<MissedHabitsInnerManagerProps> = function ({
  stats,
  prevStats,
}) {
  const store = useAppStore();
  let missedCount = 0;
  for (let i = prevStats.length; i < stats.length; i++) {
    missedCount += stats[i].missedCount;
  }
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      store.dispatch(gameActions.addCoins(-missedCount * 10));
    }
    return () => {
      ignore = true;
    };
  });
  return <></>;
};
