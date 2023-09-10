import { GameDetails, Gamer } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  gameDetails: GameDetails;
  gamersForNewGame: Gamer[];
  selectedGamerId?: number;
}

export const initialState: State = {
  gameDetails: {} as GameDetails,
  gamersForNewGame: [],
};

export const reducer = createReducer(
  initialState,

  on(GameActions.loadGamersForNewGameSuccess, (state, { gamers }) => ({
    ...state,
    gamersForNewGame: gamers,
  })),

  on(GameActions.setSelectedGamerId, (state, { id }) => ({
    ...state,
    selectedGamerId: id,
  })),

  // on(GameActions.loadGamesFailure, (state, action) => state),
  on(
    GameActions.loadGameDetailsSuccess,
    GameActions.updateGameDetailsSuccess,
    (state, { game }) => ({
      ...state,
      gameDetails: game,
    })
  )
);
