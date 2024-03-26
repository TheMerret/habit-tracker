'use client';

import { FunctionComponent, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  CheckCircledIcon,
  ClockIcon,
  PieChartIcon,
} from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AppHabit } from '@/lib/schemas';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import {
  selectAction,
  selectHabitState,
} from '@/redux/features/habits/selectors';
import { habitsActions } from '@/redux/features/habits';
import { selectDateTime } from '@/redux/features/datetime/selectors';

interface StateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  habit: AppHabit;
}

export const StateCard: FunctionComponent<StateCardProps> = function ({
  habit,
}) {
  const date =
    useAppSelector((state) => selectDateTime(state, new Date().toString())) ??
    new Date();
  const initialized = useRef(false);
  const state = useAppSelector((state) =>
    selectHabitState(state, habit.id, date.toDateString())
  );
  const store = useAppStore();
  if (!initialized.current && !state) {
    initialized.current = true;
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
  function setStatus(check: boolean) {
    const d = state?.date ?? new Date().toDateString();
    store.dispatch(
      habitsActions.editHabitState({
        habitId: habit.id,
        value: +check,
        date: d,
      })
    );
    if (check && !action) {
      store.dispatch(habitsActions.addAction({ id: habit.id, date: d }));
    } else if (action && !check) {
      store.dispatch(habitsActions.removeAction({ id: habit.id, date: d }));
    } else if (action && check) {
      store.dispatch(habitsActions.editAction({ id: habit.id, date: d }));
    }
  }
  const periodText =
    habit.period === 'daily'
      ? 'Ежедневно'
      : habit.period == 'monthly'
        ? 'Ежемесячно'
        : 'Еженедельно';
  return (
    <Card className="w-72">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">{habit.emoji}</div>
          {!state?.value ? (
            <PieChartIcon className="w-16 h-16" />
          ) : (
            <CheckCircledIcon className="w-16 h-16" />
          )}
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
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Checkbox
          id={`done-${habit.id}`}
          checked={state?.value === 1}
          onCheckedChange={(e) => setStatus(!!e.valueOf())}
        />
        <Label htmlFor={`done-${habit.id}`}>Готово</Label>
      </CardFooter>
    </Card>
  );
};
