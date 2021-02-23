import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

export const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const selectGameDetails = createSelector(
  selectGameState,
  (state) => state.gameDetails
);

export const selectGames = createSelector(
  selectGameState,
  (state) => state.gamesList
);

export const selectGamersForNewGame = createSelector(
  selectGameState,
  (state) => state.gamersForNewGame
);
