import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GameStoreFacade } from '@app/state/game';
import { Observable, of } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<boolean> {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.gameStoreFacade.loadGames();
    return this.gameStoreFacade.loadGamesSuccess$.pipe(take(1), mapTo(true));
  }
}
