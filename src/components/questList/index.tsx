import { FunctionComponent } from 'react';
import { QuestComponent } from '@/components/questComponent';

export const QuestList: FunctionComponent = function () {
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl self-center">
        Квесты
      </h1>
      <span className="text-xl text-muted-foreground">
        Выполняйте квесты зарабатывая очки
      </span>
      <QuestComponent />
      <QuestComponent />
      <QuestComponent />
    </div>
  );
};
