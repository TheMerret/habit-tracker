'use client';

import { FunctionComponent } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  ClockIcon,
  CrossCircledIcon,
  Crosshair2Icon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppHabit } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/redux/hooks';
import { habitsActions } from '@/redux/features/habits';
import { toast } from 'sonner';

interface TrashCardProps extends React.HTMLAttributes<HTMLDivElement> {
  habit: AppHabit;
}

export const TrashCard: FunctionComponent<TrashCardProps> = function ({
  habit: storedHabit,
  ...props
}) {
  const periodText =
    storedHabit.period === 'daily'
      ? 'Ежедневно'
      : storedHabit.period == 'monthly'
        ? 'Ежемесячно'
        : 'Еженедельно';
  const store = useAppStore();
  function restoreHabit() {
    store.dispatch(
      habitsActions.editHabit({
        ...storedHabit,
        active: true,
      })
    );
    toast('Привычка восстановлена');
  }
  function removeHabit() {
    store.dispatch(habitsActions.removeHabit(storedHabit.id));
    toast('Привычка удалена');
  }
  return (
    <Card {...props} className={cn('max-w-72', props.className)}>
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">{storedHabit.emoji}</div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {storedHabit.title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge>
            <ClockIcon />
            <span>{periodText}</span>
          </Badge>
          {storedHabit.targetValue && (
            <Badge>
              <Crosshair2Icon />
              <span>Цель - {storedHabit.targetValue}</span>
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={() => restoreHabit()}>
          <ReloadIcon />
          Вернуть
        </Button>
        <Button onClick={() => removeHabit()}>
          <CrossCircledIcon />
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};
