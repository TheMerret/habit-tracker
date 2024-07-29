import { FunctionComponent } from 'react';
import { Separator } from '@/components/ui/separator';
import { StreakArmour } from '../streakArmour';

export const BoostsWidget: FunctionComponent = function () {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Бусты</h3>
        <p className="text-sm text-muted-foreground">
          Предметы помогающие вам в процессе достижения целей
        </p>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap">
        <StreakArmour />
      </div>
    </div>
  );
};
