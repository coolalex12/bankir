import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameStoreFacade } from '@app/state/game';

@Component({
  selector: 'app-gamer-history',
  templateUrl: './gamer-history.component.html',
  styleUrls: ['./gamer-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamerHistoryComponent {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}
  history$ = this.gameStoreFacade.currentGamerHistory$;
  currentGameId$ = this.gameStoreFacade.currentGameId$;
}
