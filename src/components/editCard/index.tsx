'use client';

import { z } from 'zod';
import { FunctionComponent } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { habitFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HabitPeriod, HabitType } from '@/lib/types';
import { Form } from '@/components/ui/form';
import {
  CountControl,
  EmojiControl,
  NotificationControl,
  TitleControl,
} from '@/components/habitForm';

export const EditCard: FunctionComponent = function () {
  const habitData = {
    emoji: '🛌',
    title: 'Рано вставать',
    notificationEnabled: false,
    category: 'Здоровье',
    period: HabitPeriod.daily,
    type: HabitType.count,
    addDate: '2024-03-22',
  };
  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habitFormSchema.parse(habitData),
  });
  const watchType = form.watch('type');
  function onSubmit(values: z.infer<typeof habitFormSchema>) {
    console.log(values);
  }
  return (
    <Card className="w-[350px]">
      <CardHeader></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent>
            <EmojiControl form={form} />
            <TitleControl form={form} />
            <NotificationControl form={form} />
            {watchType === 'count' ? <CountControl form={form} /> : null}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit">Изменить</Button>
            <Button>
              <TrashIcon />
              Убрать
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
