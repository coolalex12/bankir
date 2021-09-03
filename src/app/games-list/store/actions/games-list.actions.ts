import { GameDetails } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const loadGamesStart = createAction('[Game] Load Games Start');

export const loadGamesSuccess = createAction(
  '[Game] Load Games Success',
  props<{ games: GameDetails[] }>()
);

export const loadGamesFailure = createAction(
  '[Game] Load Games Failure',
  props<{ error: any }>()
);
