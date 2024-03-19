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
  Crosshair2Icon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

export const CountCard: FunctionComponent = function () {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between content-center	">
          <div className="text-7xl">💧</div>
          <Button size="icon">
            <BellIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          8 стаканов воды
        </h3>
        <div className="flex items-center gap-2">
          <Crosshair2Icon />
          <span className="text-muted-foreground">8 раз</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" size="icon">
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span>0</span>
        <Button variant="default" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
