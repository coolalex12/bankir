import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GameDetails, Gamer } from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetailsComponent {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  public gameDetails$: Observable<GameDetails | undefined> = this
    .gameStoreFacade.gameDetails$;

  public addBuy(gamer: Gamer, nominal: number): void {
    this.gameStoreFacade.addBuy(gamer, nominal);
  }
}
