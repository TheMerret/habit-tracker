import { FunctionComponent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { BellIcon, CheckIcon, ClockIcon } from '@radix-ui/react-icons';

export const AlarmCard: FunctionComponent = function () {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">🛌</div>
          <Button size="icon">
            <BellIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Рано вставать
        </h3>
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span className="text-muted-foreground">6:00</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <CheckIcon className="mr-2 h-4 w-4" /> Готово
        </Button>
      </CardFooter>
    </Card>
  );
};
