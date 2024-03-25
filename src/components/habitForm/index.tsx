'use client';

import { z } from 'zod';
import { FunctionComponent } from 'react';
import { HabitType } from '@/lib/types';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format, setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import { habitFormSchema } from '@/lib/schemas';
import { useAppStore } from '@/redux/hooks';
import { habitsActions } from '@/redux/features/habits';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
setDefaultOptions({ locale: ru });

type FormValues = z.infer<typeof habitFormSchema>;

export function EmojiControl({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormField
      control={form.control}
      name="emoji"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Иконка</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>
            Этот эмодзи будет отображаться в списке привычек.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TitleControl({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Название</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>
            Это название будет отображаться в списке привычек.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function NotificationControl({
  form,
}: {
  form: UseFormReturn<FormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="notificationEnabled"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Уведомления</FormLabel>
          <FormControl>
            <div>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          </FormControl>
          <FormDescription>
            Получать уведомления о напоминании выполнения привычки.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CountControl({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <FormField
      control={form.control}
      name="targetValue"
      shouldUnregister={true}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Количество</FormLabel>
          <FormControl>
            <Input {...field} type="number" min={1} />
          </FormControl>
          <FormDescription>
            Сколько раз вы хотите выполнять привычку.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}

export const HabitForm: FunctionComponent = function () {
  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habitFormSchema.parse({
      type: HabitType.state,
      targetValue: 1,
    }),
  });
  const watchType = form.watch('type');
  const store = useAppStore();
  const router = useRouter();
  function onSubmit(values: z.infer<typeof habitFormSchema>) {
    store.dispatch(
      habitsActions.addHabit({
        emoji: values.emoji,
        title: values.title,
        period: values.period,
        category: values.category,
        targetValue: values.targetValue,
        addDate: values.addDate.toISOString(),
        active: true,
        notificationEnabled: values.notificationEnabled,
      })
    );
    router.push('/habits');
    toast('Привычка добавлена');
  }
  const categories = [
    'Другое',
    'Спорт',
    'Продуктивность',
    'Здоровье',
    'Образование',
    'Развлечения',
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmojiControl form={form} />
        <TitleControl form={form} />
        <NotificationControl form={form} />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between flex',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? categories.find((c) => c === field.value)
                        : 'Выберите категорию'}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Поиск категории..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Создать новую категорию</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category, ind) => (
                          <CommandItem
                            value={category}
                            key={ind}
                            onSelect={() => {
                              form.setValue('category', category);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                category === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                К какой категории относится привычка.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Период</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите период привычки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Ежедневно</SelectItem>
                  <SelectItem value="weekly">Еженедельно</SelectItem>
                  <SelectItem value="monthly">Ежемесячно</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                На какой период вы хотите отслеживать привычку.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          shouldUnregister={true}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип привычки" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={HabitType.state}>Качественная</SelectItem>
                  <SelectItem value={HabitType.number}>
                    Количественная
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Какой тип привычки вы хотите отслеживать.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchType === HabitType.number ? <CountControl form={form} /> : null}
        <FormField
          control={form.control}
          name="addDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата начала отслеживания</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={ru}
                    ISOWeek
                    disabled={(date) => {
                      return (
                        date < new Date('1980-01-01') ||
                        date > new Date('2100-01-01')
                      );
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Выберите дату, с которой начнется отслеживание привычки.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Готово</Button>
      </form>
    </Form>
  );
};
