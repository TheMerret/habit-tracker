'use client';

import { selectStreakDays } from '@/redux/features/game/selectors';
import { useAppSelector } from '@/redux/hooks';
import { FunctionComponent, useState } from 'react';

export const StreakWidget: FunctionComponent = function () {
  const days = useAppSelector((state) => selectStreakDays(state));
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {days}й
      </h1>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        день подряд
      </h2>
    </div>
  );
};
