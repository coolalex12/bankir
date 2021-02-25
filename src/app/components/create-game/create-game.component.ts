import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@ngneat/reactive-forms';
import { GameDetails, NewGameFormValue, SelectableGamer } from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class CreateGameComponent implements OnInit {
  public form: FormGroup<NewGameFormValue>;

  public gamers: SelectableGamer[] = [];

  constructor(private readonly gameStoreFacade: GameStoreFacade) {
    this.form = new FormGroup<NewGameFormValue>({
      gamers: new FormArray<SelectableGamer>([]),
    });
  }

  get gamersFormArray(): FormArray {
    return this.form.controls.gamers as FormArray;
  }

  public ngOnInit(): void {
    this.gameStoreFacade.gamersForNewGame$
      .pipe(untilDestroyed(this))
      .subscribe((gamers) => {
        this.gamers = gamers;
        this.fillGamersFormArray(gamers);
      });
  }

  public createGame(): void {
    const newGame = this.getNewGameFormValue();
    this.gameStoreFacade.createGame(newGame);
  }

  private fillGamersFormArray(gamers: SelectableGamer[]): void {
    gamers.map((gamer) => {
      this.gamersFormArray.push(new FormControl(gamer.selected));
    });
  }

  private getNewGameFormValue(): GameDetails {
    const selectedGamers: SelectableGamer[] = this.gamersFormArray.value.reduce(
      (acc, value, i) => (value ? [...acc, this.gamers[i]] : acc),
      []
    );
    const newGame: GameDetails = {
      date: new Date().toLocaleDateString(),
      gamersBuy: selectedGamers.map((item) => ({
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
      })),
    };

    newGame.totalBuy = newGame.gamersBuy.reduce((acc, current) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      acc += current.totalBuy!;
      return acc;
    }, 0);

    return newGame;
  }
}
