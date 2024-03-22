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
      type: z.literal(HabitType.count),
      count: z.coerce.number().int().positive().default(1),
    })
  ),
  baseHabitSchema.merge(
    z.object({
      type: z.literal(HabitType.done),
      count: z.coerce.number().int().positive().default(1).optional(),
    })
  ),
]);
