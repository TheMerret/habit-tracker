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
export const selectActiveHabits = createSelector(
  selectHabitsModule,
  (module) => module.habits.filter((habit) => habit.active)
);
export const selectTrashHabits = createSelector(selectHabitsModule, (module) =>
  module.habits.filter((habit) => !habit.active)
);

export const selectTemplates = createSelector(
  selectHabitsModule,
  (module) => module.templates
);
export const selectActions = createSelector(
  selectHabitsModule,
  (module) => module.actions
);
export const selectHabitById = createSelector(
  [selectHabitsModule, (_: unknown, id: number) => id],
  (module, id) => module.habits.find((h) => h.id === id)
);
