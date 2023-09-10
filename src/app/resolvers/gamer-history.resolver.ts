import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GameStoreFacade } from '@app/state/game';
import { Observable } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GamerHistoryResolver implements Resolve<boolean> {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const gameId = Number(route.params.gameId);
    const gamerId = Number(route.params.gamerId);
    this.gameStoreFacade.loadGame(gameId);
    this.gameStoreFacade.setSelectedGamerId(gamerId);
    return this.gameStoreFacade.loadGameSuccess$.pipe(take(1), mapTo(true));
  }
}
