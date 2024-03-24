'use client';

import { Separator } from '@radix-ui/react-select';
import { FunctionComponent } from 'react';

export const LeaderBoardComponent: FunctionComponent = function () {
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl self-center">
        🥇
      </h1>
      <span className="text-xl text-muted-foreground">
        Посмотрите на каком вы месте в рейтинге
      </span>
      <Separator />
      <div className="flex flex-col flex-wrap gap-2">
        <span className="text-2xl font-semibold tracking-tight">
          1. Алексей
        </span>
        <span className="text-2xl font-semibold tracking-tight">2. Ирина</span>
        <span className="text-2xl font-semibold tracking-tight">
          3. Андрей
        </span>
      </div>
    </div>
  );
};
