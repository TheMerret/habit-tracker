import { FunctionComponent } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '../ui/card';

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
        <Card className="max-w-72">
          <CardHeader>
            <div className="flex flex-wrap justify-between content-center	">
              <div className="text-7xl">🛡️</div>
            </div>
          </CardHeader>
          <CardContent>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Сохранение стрика
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
