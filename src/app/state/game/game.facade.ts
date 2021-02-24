import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './game.actions';
import * as selectors from './game.selectors';
import { GameDetails } from '../../models/game.model';
import { Actions, ofType } from '@ngrx/effects';
import { Gamer, SelectableGamer } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class GameStoreFacade {
  constructor(private store: Store, private action$: Actions) {}
  public gameDetails$ = this.store.pipe(select(selectors.selectGameDetails));

  public games$ = this.store.pipe(select(selectors.selectGames));

  public gamersForNewGame$ = this.store.pipe(
    select(selectors.selectGamersForNewGame)
  );

  public loadGameSuccess$ = this.action$.pipe(
    ofType(actions.loadGameDetailsSuccess)
  );

  public loadGamesSuccess$ = this.action$.pipe(
    ofType(actions.loadGamesSuccess)
  );

  public createGame(game: GameDetails): void {
    this.store.dispatch(actions.createGameDetailsStart({ game }));
  }

  public loadGame(gameId: number): void {
    this.store.dispatch(actions.loadGameDetailsStart({ gameId }));
  }

  public loadGames(): void {
    this.store.dispatch(actions.loadGamesStart());
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
}
