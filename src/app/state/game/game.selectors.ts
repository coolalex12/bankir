import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

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

// TODO timofeev - подключить когда будет возможность добавить игрока
export const selectGamersInGame = createSelector(selectGameState, (state) =>
  state.gameDetails.gamersBuy.map((item) => item.user)
);

// TODO timofeev - подключить когда будет возможность добавить игрока
export const selectGamersNotInGame = createSelector(
  selectGamersForNewGame,
  selectGamersInGame,
  (allGamers, gamersInGame) => {
    const ids = gamersInGame.map((item) => item.id);
    return allGamers.filter((item) => !ids.includes(item.id));
  }
);
