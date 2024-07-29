import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GameState {
  coins: number;
  multiplier: number;
  petHealth: number;
  streakDays: number;
}

const initialState: GameState = {
  coins: 0,
  multiplier: 1,
  petHealth: 50,
  streakDays: 1,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.coins += action.payload;
        state.coins = Math.max(state.coins, 0);
      }
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = Math.max(Math.min(action.payload, 10), 1);
    },
    editPetHealth: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.petHealth += action.payload;
        state.petHealth = Math.max(Math.min(state.petHealth, 100), 0);
      }
    },
    setStreakDays: (state, action: PayloadAction<number>) => {
      state.streakDays = Math.max(action.payload, 1);
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
