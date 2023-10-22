import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameStoreFacade } from '@app/state/game';

@Component({
  selector: 'app-add-gamers',
  templateUrl: './add-gamers.component.html',
  styleUrls: ['./add-gamers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGamersComponent {
  constructor(private readonly gameStoreFacade: GameStoreFacade) {}

  gamersFormControl = new FormControl();

  items$ = this.gameStoreFacade.gamersNotInGame$;
  currentGameId$ = this.gameStoreFacade.currentGameId$;

  get isAddButtonDisabled(): boolean {
    return (
      !this.gamersFormControl.value || this.gamersFormControl.value?.length < 1
    );
  }

  addButtnClicked(): void {
    this.gameStoreFacade.addGamersToGame(this.gamersFormControl.value);
  }
}
