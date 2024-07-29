'use client';

import { FunctionComponent } from 'react';
import {
  CalendarHeatmap,
  WeightedDateEntry,
} from '@/components/ui/calendar-heatmap';
import { useAppSelector } from '@/redux/hooks';
import { selectStatisticsEntries } from '@/redux/features/statistics/selectors';

export const DateStat: FunctionComponent = function () {
  const statistics = useAppSelector((state) => selectStatisticsEntries(state));
  const weightedStatistics = statistics.reduce(
    (acc: WeightedDateEntry[], cur) => {
      const doneCnt =
        cur.doneCount.daily + cur.doneCount.weekly + cur.doneCount.monthly;
      if (doneCnt) {
        acc.push({
          date: new Date(cur.date),
          weight: doneCnt,
        });
      }
      return acc;
    },
    []
  );
  return (
    <CalendarHeatmap
      variantClassnames={[
        'text-white hover:text-white bg-green-400 hover:bg-green-400',
        'text-white hover:text-white bg-green-500 hover:bg-green-500',
        'text-white hover:text-white bg-green-700 hover:bg-green-700',
      ]}
      weightedDates={weightedStatistics}
      mode="single"
      className="rounded-md border"
    />
  );
};
