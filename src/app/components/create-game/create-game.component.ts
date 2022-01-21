import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { GameDetails, Gamer } from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameComponent implements OnInit {
  public gamers: Gamer[] = [];

  gamersFormControl = new FormControl();

  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  public ngOnInit(): void {
    this.gameStoreFacade.gamersForNewGame$
      .pipe(untilDestroyed(this))
      .subscribe((gamers) => {
        this.gamers = gamers;
      });
  }

  public createGame(): void {
    const newGame = this.getNewGameFormValue();
    this.gameStoreFacade.createGame(newGame);
  }

  private getNewGameFormValue(): GameDetails {
    const selectedGamers = this.gamersFormControl.value;
    const newGame: GameDetails = new GameDetails(
      new Date().toLocaleDateString(),
      selectedGamers.map((item: Gamer) => ({
        user: {
          id: item.id,
          name: item.name,
        },
        buy: [
          {
            nominal: 200,
            count: 1,
          },
        ],
        totalBuy: 200,
      }))
    );

    newGame.totalBuy = newGame.gamers.reduce((acc, current) => {
      acc += current.totalBuy ?? 0;
      return acc;
    }, 0);

    return newGame;
  }
}
