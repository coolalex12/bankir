import { GameDetails } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import * as GamesListActions from '../actions/games-list.actions';

export const gamesListFeatureKey = 'gamesList';

export interface State {
  gamesList: GameDetails[];
}

export const initialState: State = {
  gamesList: [],
};

export const reducer = createReducer(
  initialState,

  on(GamesListActions.loadGamesSuccess, (state, { games }) => ({
    ...state,
    gamesList: games,
  }))
);
