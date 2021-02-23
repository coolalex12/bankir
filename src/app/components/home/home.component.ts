import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GameDetails } from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  public games$: Observable<GameDetails[]> = this.gameStoreFacade.games$;
}
