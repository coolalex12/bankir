import { GameDetails, Gamer } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const loadGameDetailsStart = createAction(
  '[Game] Load Game Details Start',
  props<{ gameId: number }>()
);

export const loadGameDetailsSuccess = createAction(
  '[Game] Load Game Details Success',
  props<{ game: GameDetails }>()
);

export const loadGameDetailsFailure = createAction(
  '[Game] Load Game Details Failure',
  props<{ error: any }>()
);

export const createGameDetailsStart = createAction(
  '[Game] Create Game Details Start',
  props<{ game: GameDetails }>()
);

export const createGameDetailsSuccess = createAction(
  '[Game] Create Game Details Success',
  props<{ game: GameDetails }>()
);

export const createGameDetailsFailure = createAction(
  '[Game] Create Game Details Failure',
  props<{ error: any }>()
);

export const addBuyStart = createAction(
  '[Game] Add Buy Start',
  props<{ gamer: Gamer; nominal: number }>()
);

export const updateGameDetailsSuccess = createAction(
  '[Game] Save Game Details Success',
  props<{ game: GameDetails }>()
);

export const updateGameDetailsFailure = createAction(
  '[Game] Save Game Details Failure',
  props<{ error: any }>()
);
