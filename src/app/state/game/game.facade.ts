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
  constructor(private store: Store, private action$: Actions) {
    // this.createGame();
    //
  }
  public gameDetails$ = this.store.pipe(select(selectors.selectGameDetails));

  public loadGameSuccess$ = this.action$.pipe(
    ofType(actions.loadGameDetailsSuccess)
  );

  public createGame(): void {
    // debug!!
    const game: GameDetails = {
      // id: '100500',
      date: new Date().toLocaleDateString(),
      gamers: [
        {
          user: {
            id: '1',
            name: 'Имя 1',
          },
          buy: [
            {
              nominal: 200,
              count: 3,
            },
            {
              nominal: 300,
              count: 1,
            },
          ],
        },
        {
          user: {
            id: '2',
            name: 'Имя 2',
          },
          buy: [
            {
              nominal: 200,
              count: 2,
            },
          ],
        },
      ],
    };
    this.store.dispatch(actions.createGameDetailsStart({ game }));
  }

  public loadGame(gameId: number): void {
    this.store.dispatch(actions.loadGameDetailsStart({ gameId }));
  }

  public updateGame(game: GameDetails): void {
    this.store.dispatch(actions.saveGameDetailsStart({ game }));
  }

  public addBuy(gamer: Gamer, nominal: number): void {
    //TODO
  }
}
