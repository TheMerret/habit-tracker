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
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { format, setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
setDefaultOptions({ locale: ru });

const dateTimeFormSchema = z.object({
  datetime: z
    .date({ required_error: 'Введите дату и время' })
    .default(() => new Date()),
});

export const DateTimeForm: FunctionComponent = function () {
  const form = useForm<z.infer<typeof dateTimeFormSchema>>({
    resolver: zodResolver(dateTimeFormSchema),
    defaultValues: dateTimeFormSchema.parse({}),
  });
  function onSubmit(data: z.infer<typeof dateTimeFormSchema>) {
    console.log(data.datetime);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-max space-y-6">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Текущее время
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPPp')
                      ) : (
                        <span>Выберите дату и время</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    className="p-0"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <Input
                    type="time"
                    className="mt-2"
                    value={format(field.value, 'HH:mm')}
                    onChange={(selectedTime) => {
                      const currentTime = field.value;
                      currentTime.setHours(
                        parseInt(selectedTime.target.value.split(':')[0]),
                        parseInt(selectedTime.target.value.split(':')[1]),
                        0
                      );
                      field.onChange(currentTime);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
              <FormDescription>Выберете текущее время</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Изменить</Button>
      </form>
    </Form>
  );
};
