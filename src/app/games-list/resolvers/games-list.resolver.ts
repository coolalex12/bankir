import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';
import { GamesListStoreFacadeService } from '../store';

@Injectable({
  providedIn: 'root',
})
export class GamesListResolver implements Resolve<boolean> {
  constructor(private readonly gameStoreFacade: GamesListStoreFacadeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.gameStoreFacade.loadGames();
    return this.gameStoreFacade.loadGamesSuccess$.pipe(take(1), mapTo(true));
  }
}
