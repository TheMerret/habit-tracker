'use client';

import { cn } from '@/lib/utils';
import { selectHabitsFromDate } from '@/redux/features/habits/selectors';
import { useAppSelector } from '@/redux/hooks';
import { FunctionComponent } from 'react';
import { NumberCard } from '@/components/numberCard';
import { StateCard } from '@/components/stateCard';
import { selectDateTime } from '@/redux/features/datetime/selectors';

interface HomeListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HomeList: FunctionComponent<HomeListProps> = function (props) {
  const date =
    useAppSelector((state) => selectDateTime(state, new Date().toString())) ??
    new Date();
  const habits = useAppSelector((state) =>
    selectHabitsFromDate(state, date.toDateString())
  );
  return (
    <div
      {...props}
      className={cn('flex flex-wrap gap-x-16 gap-y-6', props.className)}
    >
      {habits.map((habit, ind) =>
        habit.targetValue ? (
          <NumberCard key={ind} habit={habit} />
        ) : (
          <StateCard key={ind} habit={habit} />
        )
      )}
    </div>
  );
};
