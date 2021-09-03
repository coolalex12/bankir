import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGamesList from '../reducers/games-list.reducer';

export const selectGamesListState = createFeatureSelector<fromGamesList.State>(
  fromGamesList.gamesListFeatureKey
);

export const selectGames = createSelector(
  selectGamesListState,
  (state) => state.gamesList
);
