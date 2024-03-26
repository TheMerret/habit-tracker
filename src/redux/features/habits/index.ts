import {
  AppHabit,
  AppHabitAction,
  HabitState,
  HabitTemplate,
} from '@/lib/schemas';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import templates from '@/redux/features/habits/templates.json';

export type HabitsState = {
  habits: AppHabit[];
  actions: AppHabitAction[];
  templates: HabitTemplate[];
  states: HabitState[];
};

const initialState: HabitsState = {
  habits: [],
  actions: [],
  templates: [],
  states: [],
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Omit<AppHabit, 'id'>>) => {
      const id = state.habits.length
        ? Math.max(...state.habits.map((habit) => habit.id)) + 1
        : 1;
      state.habits.push({ ...action.payload, id });
    },
    editHabit: (state, action: PayloadAction<AppHabit>) => {
      const habitIndex = state.habits.findIndex(
        (habit) => habit.id === action.payload.id
      );
      state.habits[habitIndex] = action.payload;
    },
    removeHabit: (state, action: PayloadAction<number>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    addAction: (state, action: PayloadAction<AppHabitAction>) => {
      state.actions.push(action.payload);
    },
    editAction: (state, action: PayloadAction<AppHabitAction>) => {
      const actionIndex = state.actions.findIndex(
        (habit) =>
          habit.id === action.payload.id && habit.date === action.payload.date
      );
      state.actions[actionIndex] = action.payload;
    },
    removeAction: (state, action: PayloadAction<AppHabitAction>) => {
      state.actions = state.actions.filter(
        (habit) =>
          habit.id !== action.payload.id || habit.date !== action.payload.date
      );
    },
    reset: () => initialState,
    loadTemplates: (state) => {
      state.templates = templates.templates.filter(
        (template): template is HabitTemplate =>
          ['daily', 'weekly', 'monthly'].includes(template.period)
      );
    },
    addHabitState: (state, action: PayloadAction<HabitState>) => {
      state.states.push(action.payload);
    },
    editHabitState: (state, action: PayloadAction<HabitState>) => {
      const habitIndex = state.habits.findIndex(
        (habit) => habit.id === action.payload.habitId
      );
      state.states[habitIndex] = action.payload;
    },
    removeHabitState: (state, action: PayloadAction<number>) => {
      state.states = state.states.filter(
        (state) => state.habitId !== action.payload
      );
    },
  },
});

export const habitsReducer = habitsSlice.reducer;
export const habitsActions = habitsSlice.actions;
