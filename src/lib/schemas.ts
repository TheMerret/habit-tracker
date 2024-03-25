import { z } from 'zod';
import { HabitPeriod, HabitType } from '@/lib/types';

const baseHabitSchema = z.object({
  emoji: z
    .string()
    .emoji()
    .default('🎯')
    .refine((s) => [...new Intl.Segmenter().segment(s)].length == 1, {
      message: 'Эмодзи должен быть одним символом',
    }),
  title: z
    .string()
    .min(2, { message: 'Название должно быть хотя бы из 2 символов' })
    .max(50, { message: 'Максимум 50 символов' })
    .default('Быть лучше!'),
  notificationEnabled: z.boolean().default(false),
  category: z.string().default('Другое'),
  period: z.nativeEnum(HabitPeriod).default(HabitPeriod.daily),
  addDate: z.coerce.date().default(() => new Date(new Date().toDateString())),
});

export const habitFormSchema = z.discriminatedUnion('type', [
  baseHabitSchema.merge(
    z.object({
      type: z.literal(HabitType.number),
      targetValue: z.coerce.number().int().positive().default(1),
    })
  ),
  baseHabitSchema.merge(
    z.object({
      type: z.literal(HabitType.state),
      targetValue: z.coerce.number().int().positive().default(1).optional(),
    })
  ),
]);

export interface Habit {
  // у каждой привычки уникальный id
  id: number;

  title: string;

  category: string;

  // дата, начиная с которой Вася трекает эту привычку
  addDate: Date;

  period: 'daily' | 'weekly' | 'monthly';

  // необязательное поле – целевое значение для численных привычек,
  // например, пройти 10000 шагов
  targetValue?: number;
}

export interface HabitMods {
  emoji: string;
  addDate: string;
  active: boolean;
  notificationEnabled: boolean;
}

export interface AppHabit extends Omit<Habit, 'addDate'>, HabitMods {}

export interface HabitAction {
  // id привычки, чтобы связать с объектами Habit
  id: number;

  // дата и время, когда это действие отмечено как выполненное
  date: Date;

  // необязательное поле – значение для численных привычек,
  // например, 12000 для привычки "пройти 10000 шагов"
  value?: number;
}

export interface AppHabitAction extends Omit<HabitAction, 'date'> {
  date: string;
}

export interface DataToUpload {
  // данные о самих привычках
  habits: Habit[];

  // данные о выполнении
  actions: HabitAction[];
}

export interface HabitTemplate {
  title: string;
  emoji: string;
  period: 'daily' | 'weekly' | 'monthly';
  category: string;
  target?: number;
}

export interface HabitState {
  habitId: number;
  date: string;
  value: number;
}
