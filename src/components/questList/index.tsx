import { FunctionComponent } from 'react';
import { QuestComponent } from '@/components/questComponent';

export const QuestList: FunctionComponent = function () {
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl self-center">
        Квесты
      </h1>
      <span className="text-xl text-muted-foreground">
        Выполняйте квесты зарабатывая монеты
      </span>
      <QuestComponent goal={100} multiplierAddition={0.3} />
      <QuestComponent goal={500} multiplierAddition={0.5} />
      <QuestComponent goal={1000} multiplierAddition={1} />
    </div>
  );
};
