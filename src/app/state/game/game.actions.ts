import { GameDetails } from '@app/models';
import { createAction, props } from '@ngrx/store';

// export const loadGames = createAction(
//   '[Game] Load Games'
// );

// export const loadGamesSuccess = createAction(
//   '[Game] Load Games Success',
//   props<{ data: any }>()
// );

// export const loadGamesFailure = createAction(
//   '[Game] Load Games Failure',
//   props<{ error: any }>()
// );

export const loadGameDetailsStart = createAction(
  '[Game] Load Game Details Start',
  props<{ gameId: number }>()
);

export const loadGameDetailsSuccess = createAction(
  '[Game] Load Game Details Success',
  props<{ game: GameDetails }>()
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

export const saveGameDetailsStart = createAction(
  '[Game] Save Game Details Start',
  props<{ game: GameDetails }>()
);

export const saveGameDetailsSuccess = createAction(
  '[Game] Save Game Details Success',
  props<{ game: GameDetails }>()
);
