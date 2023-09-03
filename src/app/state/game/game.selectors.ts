import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';
import { isNumber } from '@app/utils';

export const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const selectGameDetails = createSelector(
  selectGameState,
  (state) => state.gameDetails
);

export const selectGamersForNewGame = createSelector(
  selectGameState,
  (state) => state.gamersForNewGame
);

export const selectGamersInGame = createSelector(selectGameState, (state) =>
  state.gameDetails.gamers.map((item) => item.user)
);

export const selectGamersNotInGame = createSelector(
  selectGamersForNewGame,
  selectGamersInGame,
  (allGamers, gamersInGame) => {
    const ids = gamersInGame.map((item) => item.id);
    return allGamers.filter((item) => !ids.includes(item.id));
  }
);

export const gamersHasEmptyFields = createSelector(selectGameState, (state) => {
  const { gameDetails } = state;

  return gameDetails.gamers.some((item) => {
    return (
      !isNumber(item.balance) ||
      !isNumber(item.totalBuy) ||
      !isNumber(item.totalResult)
    );
  });
});

export const gameResultsEquals = createSelector(selectGameState, (state) => {
  const { gameDetails } = state;
  return gameDetails.totalResult === 0;
});
