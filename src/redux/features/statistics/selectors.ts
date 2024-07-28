import { createSelector } from '@reduxjs/toolkit';
import { StatisticsState } from '.';

type State = {
  statistics: StatisticsState;
};

const selectStatisticsModule = (state: State) => state.statistics;

export const selectStatisticsEntries = createSelector(
  selectStatisticsModule,
  (state) => state.entries
);
