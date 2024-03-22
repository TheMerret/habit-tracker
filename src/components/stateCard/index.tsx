'use client';

import { FunctionComponent, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  CheckCircledIcon,
  ClockIcon,
  PieChartIcon,
} from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const StateCard: FunctionComponent = function () {
  const { id } = { id: 1 };
  const [done, setDone] = useState(false);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">🛌</div>
          {!done ? (
            <PieChartIcon className="w-16 h-16" />
          ) : (
            <CheckCircledIcon className="w-16 h-16" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Рано вставать
        </h3>
        <div className="flex items-center gap-2">
          <Badge>
            <ClockIcon />
            <span>Ежедневно</span>
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Checkbox
          id={`done-${id}`}
          checked={done}
          onCheckedChange={(e) => setDone(!!e.valueOf())}
        />
        <Label htmlFor={`done-${id}`}>Готово</Label>
      </CardFooter>
    </Card>
  );
};
