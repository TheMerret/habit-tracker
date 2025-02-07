import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type StatisticsState = {
  entries: {
    date: string;
    doneCount: {
      monthly: number;
      weekly: number;
      daily: number;
    };
    missedCount: {
      monthly: number;
      weekly: number;
      daily: number;
    };
  }[];
};

const initialState: StatisticsState = {
  entries: [],
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addStatistic: (
      state,
      action: PayloadAction<StatisticsState['entries'][0]>
    ) => {
      state.entries.push(action.payload);
    },
    addStatistics: (
      state,
      action: PayloadAction<StatisticsState['entries']>
    ) => {
      if (action.payload.length) {
        state.entries = [...state.entries, ...action.payload];
      }
    },
  },
});

export const statisticsReducer = statisticsSlice.reducer;
export const statisticsActions = statisticsSlice.actions;
