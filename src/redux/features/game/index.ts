import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GameState {
  coins: number;
  multiplier: number;
  petHealth: number;
  streakDays: number;
  isStreakArmour: boolean;
}

const initialState: GameState = {
  coins: 0,
  multiplier: 1,
  petHealth: 50,
  streakDays: 1,
  isStreakArmour: false,
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
    editMultiplier: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.multiplier += action.payload;
        state.multiplier = Math.max(Math.min(state.multiplier, 10), 1);
      }
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
    setStreakArmour: (state, action: PayloadAction<boolean>) => {
      state.isStreakArmour = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
