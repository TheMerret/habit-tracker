import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DateTimeState {
  newDateTime: string;
  setAt: string;
  dateOffset: number;
}

const initialState: DateTimeState = {
  newDateTime: '',
  setAt: '',
  dateOffset: 0,
};

export const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState,
  reducers: {
    setNewDateTime: (
      state,
      action: PayloadAction<{ newDateTime: string; setAt: string }>
    ) => {
      const newDateTime = new Date(action.payload.newDateTime);
      const setAt = new Date(action.payload.setAt);
      state.dateOffset = Math.floor(
        (newDateTime.getTime() - setAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      state.newDateTime = action.payload.newDateTime;
      state.setAt = action.payload.setAt;
    },
    reset: () => initialState,
  },
});

export const dateTimeActions = dateTimeSlice.actions;
export const dateTimeReducer = dateTimeSlice.reducer;
