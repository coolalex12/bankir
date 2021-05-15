import {
  GameDetails,
  Gamer,
  GameTransaction,
  SelectableGamer,
} from '@app/models';
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

export const loadGamesStart = createAction('[Game] Load Games Start');

export const loadGamesSuccess = createAction(
  '[Game] Load Games Success',
  props<{ games: GameDetails[] }>()
);

export const loadGamesFailure = createAction(
  '[Game] Load Games Failure',
  props<{ error: any }>()
);

export const loadGamersForNewGameStart = createAction(
  '[Game] Load Gamers For New Game Start'
);

export const loadGamersForNewGameSuccess = createAction(
  '[Game] Load Gamers For New Game Success',
  props<{ gamers: SelectableGamer[] }>()
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

export const calculateTransactionsSuccess = createAction(
  '[Game] Calculate Transactions Success',
  props<{ transactions: GameTransaction[] }>()
);

export const calculateTransactionsFailure = createAction(
  '[Game] Calculate Transactions Failure',
  props<{ error: any }>()
);
