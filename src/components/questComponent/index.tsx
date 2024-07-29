'use client';

import { LightningBoltIcon } from '@radix-ui/react-icons';
import { FunctionComponent, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { selectCoins } from '@/redux/features/game/selectors';
import { gameActions } from '@/redux/features/game';
import { toast } from 'sonner';

interface QuestProps {
  goal: number;
  multiplierAddition: number;
}

export const QuestComponent: FunctionComponent<QuestProps> = function ({
  goal,
  multiplierAddition,
}) {
  const store = useAppStore();
  const coins = useAppSelector((state) => selectCoins(state));
  const progress = (coins / goal) * 100;
  store.dispatch(
    gameActions.editMultiplier(progress == 100 ? multiplierAddition : 0)
  );
  if (progress == 100) {
    toast('Вы выполнили квест!');
  }
  return (
    <div className="flex flex-row gap-x-4">
      <LightningBoltIcon className="h-8 w-8" />
      <div className="flex flex-col gap-y-2 flex-1">
        <span className="font-semibold text-sm">Заработайте {goal} монет</span>
        <Progress value={progress} />
      </div>
    </div>
  );
};
