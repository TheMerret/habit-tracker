'use client';

import {
  selectCoins,
  selectMultiplier,
} from '@/redux/features/game/selectors';
import { useAppSelector } from '@/redux/hooks';
import { LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { FunctionComponent } from 'react';

interface CoinsProps {
  count: number;
}

export const CoinsWidget: FunctionComponent<CoinsProps> = function ({
  count,
}) {
  return (
    <div className="flex flex-row gap-x-2">
      <LightningBoltIcon className="h-8 w-8" />
      <span className="text-2xl font-semibold">{count}</span>
    </div>
  );
};

export const ScoreWidget: FunctionComponent = function () {
  const coins = useAppSelector((state) => selectCoins(state));
  const multiplier = useAppSelector((state) => selectMultiplier(state));
  return (
    <div className="flex flex-row gap-x-12">
      <CoinsWidget count={coins}></CoinsWidget>
      <div className="flex flex-row gap-x-2">
        <RocketIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">x{multiplier}</span>
      </div>
    </div>
  );
};
