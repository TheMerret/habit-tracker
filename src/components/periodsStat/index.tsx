'use client';

import { StatisticsState } from '@/redux/features/statistics';
import { selectStatisticsEntries } from '@/redux/features/statistics/selectors';
import { useAppSelector } from '@/redux/hooks';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function PeriodsStat() {
  const statistics = useAppSelector((state) => selectStatisticsEntries(state));
  const reduced = statistics.reduce(
    (
      prev: Record<
        keyof StatisticsState['entries'][0]['doneCount'],
        { done: number; missed: number }
      >,
      cur
    ) => {
      prev.daily.done += cur.doneCount.daily;
      prev.weekly.done += cur.doneCount.weekly;
      prev.monthly.done += cur.doneCount.monthly;
      prev.daily.missed += cur.missedCount.daily;
      prev.weekly.missed += cur.missedCount.weekly;
      prev.monthly.missed += cur.missedCount.monthly;
      return prev;
    },
    {
      daily: {
        done: 0,
        missed: 0,
      },
      weekly: {
        done: 0,
        missed: 0,
      },
      monthly: {
        done: 0,
        missed: 0,
      },
    }
  );
  const data = [
    {
      name: 'ежедневно',
      сделано: reduced.daily.done,
      пропущено: reduced.daily.missed,
    },
    {
      name: 'еженедельно',
      сделано: reduced.weekly.done,
      пропущено: reduced.weekly.missed,
    },
    {
      name: 'ежемесячно',
      сделано: reduced.monthly.done,
      пропущено: reduced.monthly.missed,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="сделано" stackId="a" fill="#82ca9d" />
        <Bar dataKey="пропущено" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
