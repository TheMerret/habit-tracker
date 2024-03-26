import { createSelector } from '@reduxjs/toolkit';
import { DateTimeState } from '.';

type State = {
  dateTime: DateTimeState;
};

const selectDateTimeModule = (state: State) => state.dateTime;

export const selectDateTime = createSelector(
  [selectDateTimeModule, (state, dateString: string) => dateString],
  (module, dateString) => {
    if (!module.newDateTime) return undefined;
    const date = new Date(dateString);
    const setDate = new Date(module.newDateTime);
    const setAt = new Date(module.setAt);
    const offset = +date - +setAt;
    const res = new Date(+setDate + offset);
    return res;
  }
);

export const selectOffset = createSelector(
  selectDateTimeModule,
  (module) => module.dateOffset
);
