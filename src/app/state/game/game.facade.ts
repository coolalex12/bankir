import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './game.actions';
import * as selectors from './game.selectors';
import { GameDetails } from '../../models/game.model';
import { Actions, ofType } from '@ngrx/effects';
import { Gamer } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class GameStoreFacade {
  constructor(private store: Store, private action$: Actions) {}
  public gameDetails$ = this.store.pipe(select(selectors.selectGameDetails));

  public gamersForNewGame$ = this.store.pipe(
    select(selectors.selectGamersForNewGame)
  );

  public gamersNotInGame$ = this.store.pipe(
    select(selectors.selectGamersNotInGame)
  );

  public gamersHasEmptyFields$ = this.store.pipe(
    select(selectors.gamersHasEmptyFields)
  );

  public gameResultsEquals$ = this.store.pipe(
    select(selectors.gameResultsEquals)
  );

  public currentGamerHistory$ = this.store.pipe(
    select(selectors.selectCurrentGamerHistory)
  );

  public currentGameId$ = this.store.pipe(
    select(selectors.selectCurrentGameId)
  );

  public loadGameSuccess$ = this.action$.pipe(
    ofType(actions.loadGameDetailsSuccess)
  );

  public createGame(game: GameDetails): void {
    this.store.dispatch(actions.createGameDetailsStart({ game }));
  }

  public loadGame(gameId: number): void {
    this.store.dispatch(actions.loadGameDetailsStart({ gameId }));
  }

  public loadGamersForNewGame(): void {
    this.store.dispatch(actions.loadGamersForNewGameStart());
  }

  public addBuy(gamer: Gamer, nominal: number): void {
    this.store.dispatch(actions.addBuyStart({ gamer, nominal }));
  }

  public saveGamerBalance(gamer: Gamer, balance: number): void {
    this.store.dispatch(actions.saveGamerBalanceStart({ gamer, balance }));
  }

  public addGamersToGame(gamers: Gamer[]): void {
    this.store.dispatch(actions.addGamersToGameStart({ gamers }));
  }

  public calculateTransactions(): void {
    this.store.dispatch(actions.calculateTransactionsStart());
  }

  public redirectToAddGamers(): void {
    this.store.dispatch(actions.redirectToAddGamers());
  }

  public setSelectedGamerId(id: number): void {
    this.store.dispatch(actions.setSelectedGamerId({ id }));
  }
}
