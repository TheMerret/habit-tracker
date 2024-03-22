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
import { Button } from '../ui/button';

interface TrashCardProps {}

export const TrashCard: FunctionComponent<TrashCardProps> = function ({}) {
  const goal = 8;
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">💧</div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          8 стаканов воды
        </h3>
        <div className="flex items-center gap-2">
          <Badge>
            <ClockIcon />
            <span>Ежедневно</span>
          </Badge>
          <Badge>
            <Crosshair2Icon />
            <span>Цель - {goal}</span>
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button>
          <ReloadIcon />
          Вернуть
        </Button>
        <Button>
          <CrossCircledIcon />
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};
