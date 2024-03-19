'use client';

import { FunctionComponent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

export const HomeMenu: FunctionComponent = function () {
  return (
    <div className="flex justify-between items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Сделать
      </h3>
      <div className="flex gap-12 p-3">
        <Button variant="outline" className="size-14 rounded-full">
          Пн
        </Button>
        <Button className="size-14 rounded-full">Вт</Button>
        <Button className="size-14 rounded-full">Ср</Button>
        <Button className="size-14 rounded-full">Чт</Button>
        <Button className="size-14 rounded-full">Пт</Button>
        <Button className="size-14 rounded-full">Сб</Button>
        <Button className="size-14 rounded-full">Вс</Button>
      </div>
      <Button size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
};
