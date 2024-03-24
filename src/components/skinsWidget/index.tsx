import { FunctionComponent } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

export const SkinsWidget: FunctionComponent = function () {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Персонажи</h3>
        <p className="text-sm text-muted-foreground">
          Персонажи за которым вы будете ухаживать
        </p>
      </div>
      <Separator />
      <div className="flex flex-row flex-wrap gap-2">
        <Card className="max-w-72">
          <CardHeader>
            <Image src="/img/bunny.png" width={64} height={64} alt="bunny" />
          </CardHeader>
          <CardContent>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Зайчик
            </span>
          </CardContent>
        </Card>
        <Card className="max-w-72">
          <CardHeader>
            <Image src="/img/cat.png" width={64} height={64} alt="cat" />
          </CardHeader>
          <CardContent>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Котейка
            </span>
          </CardContent>
        </Card>
        <Card className="max-w-72">
          <CardHeader>
            <Image
              src="/img/chicken.png"
              width={64}
              height={64}
              alt="chicken"
            />
          </CardHeader>
          <CardContent>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Цыпленок
            </span>
          </CardContent>
        </Card>
        <Card className="max-w-72">
          <CardHeader>
            <Image src="/img/dog.png" width={64} height={64} alt="dog" />
          </CardHeader>
          <CardContent>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Собака
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
