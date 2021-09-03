import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as GamesListActions from '../actions/games-list.actions';
import { GameDbService } from '@app/db';

@Injectable()
export class GamesListEffects {
  public loadGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GamesListActions.loadGamesStart),
      switchMap(() =>
        this.dbService.getGames().pipe(
          map((games) => GamesListActions.loadGamesSuccess({ games })),
          catchError((error) => {
            return of(GamesListActions.loadGamesFailure({ error }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private dbService: GameDbService) {}
}
