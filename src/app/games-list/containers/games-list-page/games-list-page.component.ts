import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GameDetails } from '@app/models';
import { Observable } from 'rxjs';
import { GamesListStoreFacadeService } from '../../store';

@Component({
  selector: 'app-games-list-page',
  templateUrl: './games-list-page.component.html',
  styleUrls: ['./games-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListPageComponent {
  constructor(private readonly gameStoreFacade: GamesListStoreFacadeService) {
    this.games$ = this.gameStoreFacade.games$;
  }

  public games$: Observable<GameDetails[]>;
}
