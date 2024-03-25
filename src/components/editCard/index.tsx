'use client';

import { z } from 'zod';
import { FunctionComponent } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ClockIcon, CubeIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { AppHabit, habitFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import {
  CountControl,
  EmojiControl,
  NotificationControl,
  TitleControl,
} from '@/components/habitForm';
import { cn } from '@/lib/utils';
import { HabitType } from '@/lib/types';
import { useAppStore } from '@/redux/hooks';
import { habitsActions } from '@/redux/features/habits';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

interface HabitListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  habit: AppHabit;
}

export const EditCard: FunctionComponent<HabitListCardProps> = function ({
  habit: storedHabit,
  ...props
}) {
  const habit = {
    ...storedHabit,
    type: storedHabit.targetValue ? HabitType.number : HabitType.state,
  };
  const periodText =
    habit.period === 'daily'
      ? 'Ежедневно'
      : habit.period == 'monthly'
        ? 'Ежемесячно'
        : 'Еженедельно';
  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habitFormSchema.parse(habit),
  });
  const watchType = form.watch('type');
  const store = useAppStore();
  function onSubmit(values: z.infer<typeof habitFormSchema>) {
    store.dispatch(
      habitsActions.editHabit({
        id: habit.id,
        title: values.title,
        category: values.category,
        addDate: habit.addDate,
        period: values.period,
        targetValue: values.targetValue,
        emoji: values.emoji,
        active: habit.active,
        notificationEnabled: values.notificationEnabled,
      })
    );
    toast('Привычка изменена');
  }
  function archiveHabit() {
    store.dispatch(
      habitsActions.editHabit({
        ...storedHabit,
        active: false,
      })
    );
    toast('Привычка перемещена в корзину');
  }
  return (
    <>
      {habit ? (
        <Card {...props} className={cn('max-w-72', props.className)}>
          <CardHeader></CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 flex-1"
            >
              <CardContent>
                <EmojiControl form={form} />
                <TitleControl form={form} />
                <NotificationControl form={form} />
                {watchType === HabitType.number ? (
                  <CountControl form={form} />
                ) : null}
              </CardContent>
              <CardFooter className="flex flex-1  justify-end flex-col gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <Badge>
                    <CubeIcon />
                    <span>{habit.category}</span>
                  </Badge>
                  <Badge>
                    <ClockIcon />
                    <span>{periodText}</span>
                  </Badge>
                </div>
                <Button type="submit">Изменить</Button>
                <Button type="button" onClick={() => archiveHabit()}>
                  <TrashIcon />
                  Убрать
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      ) : null}
    </>
  );
};
