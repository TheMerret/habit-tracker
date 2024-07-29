'use client';

import { FC, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import {
  selectCoins,
  selectStreakArmour,
} from '@/redux/features/game/selectors';
import { gameActions } from '@/redux/features/game';
import { cn } from '@/lib/utils';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { CoinsWidget } from '../scoreWidget';
import { toast } from 'sonner';

export const StreakArmour: FC = function () {
  const cost = 100;
  const armourApplied = useAppSelector((state) => selectStreakArmour(state));
  const store = useAppStore();
  const coins = useAppSelector((state) => selectCoins(state));
  const isEnough = coins >= cost;
  function applyArmour() {
    store.dispatch(gameActions.setStreakArmour(true));
  }
  const callback = useCallback(() => {
    if (!armourApplied) {
      if (isEnough) {
        applyArmour();
      } else {
        toast('Недостаточно монет(');
      }
    }
  }, [armourApplied, isEnough]);
  return (
    <Card
      className={cn(
        'max-w-72',
        armourApplied
          ? 'opacity-50 cursor-not-allowed'
          : 'transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer'
      )}
      onClick={callback}
    >
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">🛡️</div>
          {armourApplied && <CheckCircledIcon className="w-16 h-16" />}
        </div>
      </CardHeader>
      <CardContent>
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Сохранение стрика
        </span>
      </CardContent>
      <CardFooter>
        <CoinsWidget count={cost} />
      </CardFooter>
    </Card>
  );
};
