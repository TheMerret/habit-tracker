'use client';

import { z } from 'zod';
import { FunctionComponent, useState } from 'react';
import { HabitCategory, HabitPeriod } from '@/lib/types';
import { useForm } from 'react-hook-form';
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
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const habitFormSchema = z.object({
  emoji: z.string().emoji().default('🎯'),
  title: z
    .string()
    .min(2, { message: 'Название должно быть хотя бы из 2 символов' })
    .max(50, { message: 'Максимум 50 символов' })
    .default('Быть лучше!'),
  notificationEnabled: z.boolean().default(false),
  category: z.string().default('Другое'),
  period: z.nativeEnum(HabitPeriod).default(HabitPeriod.daily),
});

export const HabitForm: FunctionComponent = function () {
  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: habitFormSchema.parse({}),
  });
  function onSubmit(values: z.infer<typeof habitFormSchema>) {
    console.log(values);
  }
  const [categories, setCategories] = useState<HabitCategory[]>([
    { id: 1, name: 'Другое' },
    { id: 2, name: 'Спорт' },
    { id: 3, name: 'Продуктивность' },
    { id: 4, name: 'Здоровье' },
    { id: 5, name: 'Образование' },
    { id: 6, name: 'Развлечения' },
  ]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <FormField
          control={form.control}
          name="notificationEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Уведомления</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Получать уведомления о напоминании выполнения привычки.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? categories.find((c) => c.name === field.value)?.name
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
                        {categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.id}
                            onSelect={() => {
                              form.setValue('category', category.name);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                category.name === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category.name}
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
        <Button type="submit">Готово</Button>
      </form>
    </Form>
  );
};
