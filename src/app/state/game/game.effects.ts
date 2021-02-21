import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as GameActions from './game.actions';
import * as GameSelectors from './game.selectors';
import { GameDbService } from '@app/db';
import { addBuyToGame } from '@app/utils/game-utils';
import { Store, select } from '@ngrx/store';

@Injectable()
export class GameEffects {
  public createGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.createGameDetailsStart),
      switchMap(({ game }) =>
        this.dbService.createGame(game).pipe(
          map((id) => {
            return GameActions.createGameDetailsSuccess({
              game: { ...game, id },
            });
          }),
          catchError((error) => {
            return of(GameActions.createGameDetailsFailure({ error }));
          })
        )
      )
    );
  });

  public loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGameDetailsStart),
      switchMap(({ gameId }) =>
        this.dbService.getGame(gameId).pipe(
          map((game) => GameActions.loadGameDetailsSuccess({ game })),
          catchError((error) => {
            return of(GameActions.loadGameDetailsFailure({ error }));
          })
        )
      )
    );
  });

  public addBuy$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.addBuyStart),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.selectGameDetails))
          )
        )
      ),
      switchMap(([{ gamer, nominal }, game]) => {
        const gameForSave = addBuyToGame(game, gamer.id, nominal);
        return this.dbService.updateGame(gameForSave).pipe(
          map((game) => {
            return GameActions.updateGameDetailsSuccess({ game: gameForSave });
          }),
          catchError((error) => {
            return of(GameActions.updateGameDetailsFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private dbService: GameDbService,
    private store: Store
  ) {}
}
