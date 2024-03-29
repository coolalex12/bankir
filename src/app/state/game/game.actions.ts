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

export const removeBuyStart = createAction(
  '[Game] Remove Buy Start',
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

export const loadGamersForNewGameStart = createAction(
  '[Game] Load Gamers For New Game Start'
);

export const loadGamersForNewGameSuccess = createAction(
  '[Game] Load Gamers For New Game Success',
  props<{ gamers: Gamer[] }>()
);

export const loadGamersForNewGameFailure = createAction(
  '[Game] Load Gamers For New Game Failure',
  props<{ error: any }>()
);

export const saveGamerBalanceStart = createAction(
  '[Game] Save Gamer Balance Start',
  props<{ gamer: Gamer; balance: number }>()
);

export const calculateTransactionsStart = createAction(
  '[Game] Calculate Transactions Start'
);

export const redirectToAddGamers = createAction(
  '[Game] Redirect To Add Gamers'
);

export const addGamersToGameStart = createAction(
  '[Game] Add Gamers To Game Start',
  props<{ gamers: Gamer[] }>()
);

export const addGamersToGameSuccess = createAction(
  '[Game] Add Gamers To Game Success',
  props<{ game: GameDetails }>()
);

export const addGamersToGameFailure = createAction(
  '[Game] Add Gamers To Game Failure',
  props<{ error: any }>()
);

export const setSelectedGamerId = createAction(
  '[Game] Set Selected Gamer Id',
  props<{ id: number }>()
);
