'use client';

import {
  selectCoins,
  selectMultiplier,
} from '@/redux/features/game/selectors';
import { useAppSelector } from '@/redux/hooks';
import { LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { FunctionComponent } from 'react';

export const ScoreWidget: FunctionComponent = function () {
  const coins = useAppSelector((state) => selectCoins(state));
  const multiplier = useAppSelector((state) => selectMultiplier(state));
  return (
    <div className="flex flex-row gap-x-12">
      <div className="flex flex-row gap-x-2">
        <LightningBoltIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">{coins}</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <RocketIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">x{multiplier}</span>
      </div>
    </div>
  );
};
