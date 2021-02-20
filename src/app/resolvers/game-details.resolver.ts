import { Injectable } from '@angular/core';
import {
  Router,
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
export class GameDetailsResolver implements Resolve<boolean> {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = Number(route.params.id);
    this.gameStoreFacade.loadGame(id);
    return this.gameStoreFacade.loadGameSuccess$.pipe(take(1), mapTo(true));
  }
}
