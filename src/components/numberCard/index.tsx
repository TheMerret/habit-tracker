'use client';

import { FunctionComponent, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ClockIcon, Crosshair2Icon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AppHabit } from '@/lib/schemas';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import {
  selectAction,
  selectHabitState,
} from '@/redux/features/habits/selectors';
import { habitsActions } from '@/redux/features/habits';

interface NumberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  habit: AppHabit;
}

export const NumberCard: FunctionComponent<NumberCardProps> = function ({
  habit,
}) {
  const date = new Date();
  const state = useAppSelector((state) =>
    selectHabitState(state, habit.id, date.toDateString())
  );
  const store = useAppStore();
  if (!state) {
    store.dispatch(
      habitsActions.addHabitState({
        habitId: habit.id,
        date: date.toDateString(),
        value: 0,
      })
    );
  }
  const action = useAppSelector((state) =>
    selectAction(state, habit.id, date.toDateString())
  );
  function setCount(value: number) {
    const d = state?.date ?? new Date().toDateString();
    store.dispatch(
      habitsActions.editHabitState({ habitId: habit.id, value, date: d })
    );
    if (value >= (habit.targetValue ?? 0) && !action) {
      store.dispatch(
        habitsActions.addAction({ id: habit.id, date: d, value: value })
      );
    } else if (action && value < (habit.targetValue ?? 0)) {
      store.dispatch(habitsActions.removeAction({ id: habit.id, date: d }));
    } else if (action && value >= (habit.targetValue ?? 0)) {
      store.dispatch(
        habitsActions.editAction({ id: habit.id, date: d, value: value })
      );
    }
  }
  const periodText =
    habit.period === 'daily'
      ? 'Ежедневно'
      : habit.period == 'monthly'
        ? 'Ежемесячно'
        : 'Еженедельно';
  const progress = ~~(((state?.value ?? 0) / (habit.targetValue ?? 1)) * 100);
  return (
    <Card className="w-72">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">{habit.emoji}</div>
          <span className="text-6xl">{progress}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {habit.title}
        </span>
        <div className="flex items-center gap-2">
          <Badge>
            <ClockIcon />
            <span>{periodText}</span>
          </Badge>
          <Badge>
            <Crosshair2Icon />
            <span>Цель - {habit.targetValue}</span>
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Input
          type="number"
          value={state?.value ?? 0}
          min={0}
          onChange={(e) => setCount(+e.target.value)}
        />
      </CardFooter>
    </Card>
  );
};
