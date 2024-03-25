'use client';

import {
  selectActiveHabits,
  selectTrashHabits,
} from '@/redux/features/habits/selectors';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { FunctionComponent } from 'react';
import { EditCard } from '../editCard';
import { TrashCard } from '../trashCard';

interface HabitsListProps extends React.HTMLAttributes<HTMLDivElement> {
  view: 'active' | 'trash';
}

const ActiveHabitsList: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = function (props) {
  const habits = useAppSelector(selectActiveHabits);
  return (
    <div {...props}>
      {habits.map((habit, ind) => (
        <EditCard key={ind} habit={habit} />
      ))}
    </div>
  );
};

const TrashHabitsList: FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = function (props) {
  const habits = useAppSelector(selectTrashHabits);
  return (
    <div {...props}>
      {habits.map((habit, ind) => (
        <TrashCard key={ind} habit={habit} />
      ))}
    </div>
  );
};

export const HabitsList: FunctionComponent<HabitsListProps> = function ({
  view,
  ...props
}) {
  return (
    <>
      {view === 'active' ? (
        <ActiveHabitsList {...props} />
      ) : (
        <TrashHabitsList {...props} />
      )}
    </>
  );
};
