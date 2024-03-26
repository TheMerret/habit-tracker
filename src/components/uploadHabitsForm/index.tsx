'use client';

import { FunctionComponent } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAppStore } from '@/redux/hooks';
import { habitsActions } from '@/redux/features/habits';
import { Habit, HabitAction } from '@/lib/schemas';
import { Action } from '@reduxjs/toolkit';

const ACCEPTED_FILE_TYPES = ['application/json'];

const uploadHabitsFormSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, 'Загрузите файл')
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: 'Принимается только JSON файл',
    }),
});

export const UploadHabitsForm: FunctionComponent = function () {
  const form = useForm<z.infer<typeof uploadHabitsFormSchema>>({
    resolver: zodResolver(uploadHabitsFormSchema),
  });
  const store = useAppStore();
  function onSubmit(data: z.infer<typeof uploadHabitsFormSchema>) {
    const fileReader = new FileReader();
    fileReader.readAsText(data.file, 'UTF-8');
    fileReader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== 'string') {
        toast('Ошибка чтения данных');
        return;
      }
      let obj;
      try {
        obj = JSON.parse(content);
      } catch {
        toast('Ошибка обработки данных');
        return;
      }
      const dataToUpload: { habits: Habit[]; actions: HabitAction[] } = {
        habits: [],
        actions: [],
      };
      try {
        for (const h of obj.habits) {
          dataToUpload.habits.push({
            ...h,
            addDate: h.addDate.toString(),
            emoji: '🎯',
            active: true,
            notificationEnabled: false,
          });
        }
        for (const a of obj.payload.actions) {
          dataToUpload.actions.push({
            ...a,
            date: a.date.toString(),
          });
        }
      } catch {
        toast('Ошибка обработки данных');
        return;
      }
      store.dispatch(habitsActions.loadHabits(dataToUpload));
    };
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-max space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Загрузка привычек
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Привычки"
                  accept="application/json"
                  type="file"
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                ></Input>
              </FormControl>
              <FormDescription>Загрузите файл с привычками</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  );
};
