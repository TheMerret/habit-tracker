import { LightningBoltIcon } from '@radix-ui/react-icons';
import { FunctionComponent } from 'react';
import { Progress } from '@/components/ui/progress';

export const QuestComponent: FunctionComponent = function () {
  return (
    <div className="flex flex-row gap-x-4">
      <LightningBoltIcon className="h-8 w-8" />
      <div className="flex flex-col gap-y-2 flex-1">
        <span className="font-semibold text-sm">Заработайте 50 очков</span>
        <Progress value={50} />
      </div>
    </div>
  );
};
