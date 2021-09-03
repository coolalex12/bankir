import { state } from '@angular/animations';
import { GameDetails, Gamer, SelectableGamer } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  gameDetails: GameDetails;
  gamersForNewGame: SelectableGamer[];
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
