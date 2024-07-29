import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GameState {
  coins: number;
}

const initialState: GameState = {
  coins: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.coins += action.payload;
      }
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
