'use client';

import { FunctionComponent, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ClockIcon, Crosshair2Icon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface NumberCardProps {
  template?: boolean;
}

export const NumberCard: FunctionComponent<NumberCardProps> = function ({
  template = false,
}) {
  const [count, setCount] = useState(1);
  const goal = 8;
  const progress = ~~((count / goal) * 100);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">💧</div>
          {!template ? <span className="text-6xl">{progress}%</span> : null}
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
      <CardFooter className="flex justify-between">
        {!template ? (
          <Input
            type="number"
            value={count}
            min={1}
            onChange={(e) => setCount(+e.target.value)}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
};
