import { HeartFilledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { Progress } from '@/components/ui/progress';

export const NpcWidget: FunctionComponent = function () {
  return (
    <div className="flex flex-1 flex-wrap flex-row items-center">
      <Image src="/img/bunny.png" width={128} height={128} alt="npc avatar" />
      <div className="flex flex-1 flex-row p-x-2 gap-x-2 items-center">
        <HeartFilledIcon className="h-8 w-8" />
        <Progress value={50} />
      </div>
    </div>
  );
};
