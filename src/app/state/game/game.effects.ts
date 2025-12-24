import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as GameActions from './game.actions';
import * as GameSelectors from './game.selectors';
import { GameDbService } from '@app/db';
import {
  addBuyToGame,
  addGamersToGame,
  saveGamerBalance,
} from '@app/utils/game-utils';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { GameDetails } from '@app/models';
import { TransactionsCalculatorService } from '../../utils/transactions-calculator.service';
import { mapTo } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GameEffects {
  public createGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.createGameDetailsStart),
      switchMap(({ game }) =>
        this.dbService.createGame(game).pipe(
          map(({ id }) => {
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

  public redirectToGame$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          GameActions.createGameDetailsSuccess,
          GameActions.addGamersToGameSuccess
        ),
        tap(({ game }) => {
          this.router.navigate(['game', game.id], { replaceUrl: true });
        })
      );
    },
    { dispatch: false }
  );

  public redirectToAddGamers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GameActions.redirectToAddGamers),
        tap(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }

          this.router.navigate(['add-gamers'], { relativeTo: route });
        })
      );
    },
    { dispatch: false }
  );

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
        const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
        const gameForSave = addBuyToGame(clonedGame, gamer.id, nominal);
        return this.dbService.updateGame(gameForSave).pipe(
          map((game) => {
            this.snackBar.open(`Закуп: ${gamer.name} ${nominal}`, '', {
              duration: this.toastDurationInSeconds * 1000,
            });
            return GameActions.updateGameDetailsSuccess({ game: gameForSave });
          }),
          catchError((error) => {
            return of(GameActions.updateGameDetailsFailure({ error }));
          })
        );
      })
    );
  });

  public addGamersToGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.addGamersToGameStart),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.selectGameDetails))
          )
        )
      ),
      switchMap(([{ gamers }, game]) => {
        const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
        const gameForSave = addGamersToGame(gamers, clonedGame);
        return this.dbService.updateGame(gameForSave).pipe(
          map((game) => {
            return GameActions.addGamersToGameSuccess({ game: gameForSave });
          }),
          catchError((error) => {
            return of(GameActions.addGamersToGameFailure({ error }));
          })
        );
      })
    );
  });

  public saveGamerBalance$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.saveGamerBalanceStart),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.selectGameDetails))
          )
        )
      ),
      switchMap(([{ gamer, balance }, game]) => {
        const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
        const gameForSave = saveGamerBalance(clonedGame, gamer.id, balance);
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

  public calculateTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.calculateTransactionsStart),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.selectGameDetails))
          )
        )
      ),
      switchMap(([_, game]) => {
        const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
        return this.transactionsCalculator.calculate(clonedGame).pipe(
          switchMap((transactions) => {
            const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
            clonedGame.transactions = transactions;
            return this.dbService
              .updateGame(clonedGame)
              .pipe(mapTo(clonedGame));
          }),
          map((game) => {
            return GameActions.updateGameDetailsSuccess({ game });
          }),
          catchError((error) => {
            return of(GameActions.updateGameDetailsFailure({ error }));
          })
        );
      })
    );
  });

  public loadGamersForNewGame$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGamersForNewGameStart),
      switchMap(() =>
        this.dbService.getGamers().pipe(
          map((gamers) => {
            return GameActions.loadGamersForNewGameSuccess({
              gamers,
            });
          }),
          catchError((error) => {
            return of(GameActions.loadGamersForNewGameFailure({ error }));
          })
        )
      )
    );
  });

  // TODO сделать обработку ошибки
  public error$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GameActions.updateGameDetailsFailure),
        map(({ error }) => alert(error))
      );
    },
    { dispatch: false }
  );

  toastDurationInSeconds = 5;

  constructor(
    private actions$: Actions,
    private dbService: GameDbService,
    private store: Store,
    private router: Router,
    private transactionsCalculator: TransactionsCalculatorService,
    private snackBar: MatSnackBar
  ) {}
}
