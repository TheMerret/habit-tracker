import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Skin {
  id: number;
  name: string;
  title: string;
  isBought: boolean;
  imagePath: string;
}

export interface GameState {
  coins: number;
  multiplier: number;
  petHealth: number;
  streakDays: number;
  isStreakArmour: boolean;
  skins: Record<number, Skin>;
  currentSkin: number;
}

const initialState: GameState = {
  coins: 0,
  multiplier: 1,
  petHealth: 50,
  streakDays: 1,
  isStreakArmour: false,
  skins: {
    1: {
      id: 1,
      name: 'bunny',
      title: 'Зайчик',
      isBought: true,
      imagePath: '/img/bunny.png',
    },
    2: {
      id: 2,
      name: 'cat',
      title: 'Котейка',
      isBought: false,
      imagePath: '/img/cat.png',
    },
    3: {
      id: 3,
      name: 'dog',
      title: 'Собака',
      isBought: false,
      imagePath: '/img/dog.png',
    },
    4: {
      id: 4,
      name: 'chicken',
      title: 'Цыпленок',
      isBought: false,
      imagePath: '/img/chicken.png',
    },
  },
  currentSkin: 1,
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
    setCurrentSkin: (
      state,
      action: PayloadAction<GameState['currentSkin']>
    ) => {
      if (action.payload in state.skins) {
        state.currentSkin = action.payload;
      }
    },
    updateSkin: (
      state,
      action: PayloadAction<{
        skinId: Skin['id'];
        data: Partial<Skin>;
      }>
    ) => {
      if (action.payload.skinId in state.skins) {
        const skin = state.skins[action.payload.skinId];
        skin.isBought = action.payload.data.isBought ?? skin.isBought;
      }
    },
  },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
