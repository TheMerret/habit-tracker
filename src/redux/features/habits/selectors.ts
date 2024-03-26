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
export const selectAction = createSelector(
  [
    selectHabitsModule,
    (_: unknown, id: number, date: string) => id,
    (_: unknown, id: number, date: string) => date,
  ],
  (module, id, date) =>
    module.actions.find((action) => action.id === id && action.date === date)
);
export const selectHabitById = createSelector(
  [selectHabitsModule, (_: unknown, id: number) => id],
  (module, id) => module.habits.find((h) => h.id === id)
);
export const selectCategories = createSelector(
  selectHabitsModule,
  (module) => [...new Set(module.habits.map((habit) => habit.category))]
);

export const selectHabitsFromDate = createSelector(
  [selectHabitsModule, (_: unknown, dateString: string) => dateString],
  (module, dateString) => {
    return module.habits.filter((habit) => {
      const date = new Date(dateString);
      const addDate = new Date(habit.addDate);
      const lap =
        habit.period === 'daily' ? 1 : habit.period === 'weekly' ? 7 : 30;
      const diff = Math.floor(
        (date.getTime() - addDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff < 0) return false;
      return diff % lap === 0;
    });
  }
);

export const selectHabitState = createSelector(
  [
    selectHabitsModule,
    (state, habitId: number, dateString: string) => habitId,
    (state, habitId: number, dateString: string) => dateString,
  ],
  (module, habitId, dateString) =>
    module.states.find(
      (state) => state.habitId === habitId && state.date === dateString
    )
);
