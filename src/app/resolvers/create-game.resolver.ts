import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GameStoreFacade } from '@app/state/game';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateGameResolver implements Resolve<boolean> {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.gameStoreFacade.loadGamersForNewGame();
    return of(true);
  }
}
