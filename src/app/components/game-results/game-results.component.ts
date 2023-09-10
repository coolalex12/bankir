import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GameDetails } from '@app/models';
import { isNumber } from '@app/utils';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultsComponent {
  @Input() public game: GameDetails | null | undefined;
  isNumber = isNumber;
}
