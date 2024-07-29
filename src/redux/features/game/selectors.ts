import { createSelector } from '@reduxjs/toolkit';
import { GameState } from '.';

type State = {
  game: GameState;
};

const selectGameModule = (state: State) => state.game;

export const selectCoins = createSelector(
  selectGameModule,
  (module) => module.coins
);

export const selectMultiplier = createSelector(
  selectGameModule,
  (module) => module.multiplier
);

export const selectPetHealth = createSelector(
  selectGameModule,
  (module) => module.petHealth
);

export const selectStreakDays = createSelector(
  selectGameModule,
  (module) => module.streakDays
);

export const selectStreakArmour = createSelector(
  selectGameModule,
  (module) => module.isStreakArmour
);

export const selectCurrentSkin = createSelector(
  selectGameModule,
  (module) => module.skins[module.currentSkin]
);

export const selectSkin = createSelector(
  [selectGameModule, (state, skinId: number) => skinId],
  (module, skinId) => module.skins[skinId]
);
