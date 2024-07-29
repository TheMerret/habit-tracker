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
