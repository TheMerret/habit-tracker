import { FunctionComponent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  BellIcon,
  ClockIcon,
  LapTimerIcon,
  TimerIcon,
} from '@radix-ui/react-icons';

export const TimerCard: FunctionComponent = function () {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">🏃</div>
          <Button size="icon">
            <BellIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Бегать
        </h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <ClockIcon />
            <span className="text-muted-foreground">7:00</span>
          </div>
          <div className="flex items-center gap-2">
            <LapTimerIcon />
            <span className="text-muted-foreground">60 минут</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <TimerIcon className="mr-2 h-4 w-4" /> Начать таймер
        </Button>
      </CardFooter>
    </Card>
  );
};
