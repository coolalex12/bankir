import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GameDetails } from '@app/models';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {
  @Input() public games: GameDetails[] | null | undefined;
}
