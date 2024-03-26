'use client';

import { FunctionComponent } from 'react';
import { Progress } from '@/components/ui/progress';
import { useAppSelector } from '@/redux/hooks';
import { selectDateTime } from '@/redux/features/datetime/selectors';

export const ProgressWidget: FunctionComponent = function () {
  const date = useAppSelector((state) =>
    selectDateTime(state, new Date().toString())
  );
  const formattedDate = Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  return (
    <div className="grid grid-cols-2 max-w-md gap-y-10 gap-x-5 items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Прогресс Сегодня
      </h3>
      <span className="text-sm text-muted-foreground">{formattedDate}</span>
      <Progress className="col-span-full" />
    </div>
  );
};
