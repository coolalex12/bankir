import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as GameActions from './game.actions';
import { GameDbService } from '@app/db';

@Injectable()
export class GameEffects {
  createGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.createGameDetailsStart),
      switchMap(({ game }) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.dbService.createGame(game).pipe(
          map((id) => {
            // game.id = id.toString();
            return GameActions.createGameDetailsSuccess({
              game: { ...game, id },
            });
          })
          // catchError((error) => {
          //   console.log('error', error);
          //   return of(GameActions.createGameDetailsFailure({ error }));
          // })
        )
      )
    );
  });

  loadGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGameDetailsStart),
      switchMap(({ gameId }) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.dbService.getGame(gameId).pipe(
          map((game) => GameActions.loadGameDetailsSuccess({ game }))
          // catchError((error) => {
          //   console.log('error', error);
          //   return of(GameActions.createGameDetailsFailure({ error }));
          // })
        )
      )
    );
  });

  constructor(private actions$: Actions, private dbService: GameDbService) {}
}
