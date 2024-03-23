import { LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { FunctionComponent } from 'react';

export const ScoreWidget: FunctionComponent = function () {
  return (
    <div className="flex flex-row gap-x-12">
      <div className="flex flex-row gap-x-2">
        <LightningBoltIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">100</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <RocketIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">x1</span>
      </div>
    </div>
  );
};
