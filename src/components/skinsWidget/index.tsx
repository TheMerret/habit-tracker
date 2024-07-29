'use client';

import { FunctionComponent, useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { CoinsWidget } from '../scoreWidget';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import {
  selectCoins,
  selectCurrentSkin,
  selectSkin,
} from '@/redux/features/game/selectors';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CheckCircledIcon, LockOpen2Icon } from '@radix-ui/react-icons';
import { gameActions } from '@/redux/features/game';

interface SkinEntryProps {
  skinId: number;
  cost: number;
}

const SkinEntryWidget: FunctionComponent<SkinEntryProps> = function ({
  skinId,
  cost,
}) {
  const skin = useAppSelector((state) => selectSkin(state, skinId));
  const currentSkin = useAppSelector((state) => selectCurrentSkin(state));
  const isApplied = skin.id == currentSkin.id;
  const store = useAppStore();
  const coins = useAppSelector((state) => selectCoins(state));
  const isEnough = coins >= cost;
  const callback = useCallback(() => {
    if (!skin.isBought) {
      if (isEnough) {
        store.dispatch(gameActions.addCoins(-cost));
        store.dispatch(
          gameActions.updateSkin({
            skinId,
            data: {
              isBought: true,
            },
          })
        );
        store.dispatch(gameActions.setCurrentSkin(skinId));
      } else {
        toast('Недостаточно монет(');
      }
    } else if (!isApplied) {
      store.dispatch(gameActions.setCurrentSkin(skinId));
    }
  }, [skin.isBought, currentSkin.id, isEnough]);

  return (
    <Card
      className={cn(
        'max-w-72',
        isApplied
          ? 'opacity-50 cursor-not-allowed'
          : 'transition-all ease-in-out duration-300 hover:shadow-xl hover:cursor-pointer'
      )}
      onClick={callback}
    >
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <Image src={skin.imagePath} width={64} height={64} alt={skin.name} />
          {skin.isBought && <LockOpen2Icon className="w-16 h-16" />}
          {isApplied && <CheckCircledIcon className="w-16 h-16" />}
        </div>
      </CardHeader>
      <CardContent>
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {skin.title}
        </span>
      </CardContent>
      <CardFooter>
        <CoinsWidget count={cost} />
      </CardFooter>
    </Card>
  );
};

export const SkinsWidget: FunctionComponent = function () {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Персонажи</h3>
        <p className="text-sm text-muted-foreground">
          Персонажи за которым вы будете ухаживать
        </p>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap gap-2">
        <SkinEntryWidget cost={0} skinId={1} />
        <SkinEntryWidget cost={100} skinId={2} />
        <SkinEntryWidget cost={300} skinId={3} />
        <SkinEntryWidget cost={500} skinId={4} />
      </div>
    </div>
  );
};
