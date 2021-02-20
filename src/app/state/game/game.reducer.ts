import { state } from '@angular/animations';
import { GameDetails } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  gameDetails?: GameDetails;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  // on(GameActions.loadGames, (state) => state),
  // on(GameActions.loadGamesSuccess, (state, action) => state),
  // on(GameActions.loadGamesFailure, (state, action) => state),
  on(GameActions.loadGameDetailsSuccess, (state, { game }) => ({
    ...state,
    gameDetails: game,
  }))
);
