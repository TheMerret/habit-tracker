import { Habit, HabitAction, HabitTemplate } from '@/lib/schemas';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import templates from '@/redux/features/habits/templates.json';

export type HabitsState = {
  habits: Habit[];
  actions: HabitAction[];
  templates: HabitTemplate[];
};

const initialState: HabitsState = {
  habits: [],
  actions: [],
  templates: [],
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Omit<Habit, 'id'>>) => {
      const id = state.habits.length
        ? Math.max(...state.habits.map((habit) => habit.id)) + 1
        : 1;
      state.habits.push({ ...action.payload, id });
    },
    removeHabit: (state, action: PayloadAction<number>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    addAction: (state, action: PayloadAction<HabitAction>) => {
      state.actions.push(action.payload);
    },
    reset: () => initialState,
    loadTemplates: (state) => {
      state.templates = templates.templates.filter(
        (template): template is HabitTemplate =>
          ['daily', 'weekly', 'monthly'].includes(template.period)
      );
    },
  },
});

export const habitsReducer = habitsSlice.reducer;
export const habitsActions = habitsSlice.actions;
