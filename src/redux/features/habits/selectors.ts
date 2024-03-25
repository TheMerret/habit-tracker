import { createSelector } from '@reduxjs/toolkit';
import { HabitsState } from '.';

type State = {
  habits: HabitsState;
};

const selectHabitsModule = (state: State) => state.habits;

export const selectHabits = createSelector(
  selectHabitsModule,
  (module) => module.habits
);
export const selectTemplates = createSelector(
  selectHabitsModule,
  (module) => module.templates
);
export const selectActions = createSelector(
  selectHabitsModule,
  (module) => module.actions
);
export const selectHabitById = (id: number) =>
  createSelector(selectHabits, (habits) => habits.find((h) => h.id === id));
