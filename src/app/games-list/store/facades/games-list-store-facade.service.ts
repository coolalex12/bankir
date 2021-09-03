import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as selectors from '../selectors/games-list.selectors';
import * as actions from '../actions/games-list.actions';

@Injectable({
  providedIn: 'root',
})
export class GamesListStoreFacadeService {
  constructor(private store: Store, private action$: Actions) {}

  public games$ = this.store.pipe(select(selectors.selectGames));

  public loadGamesSuccess$ = this.action$.pipe(
    ofType(actions.loadGamesSuccess)
  );

  public loadGames(): void {
    this.store.dispatch(actions.loadGamesStart());
  }
}
