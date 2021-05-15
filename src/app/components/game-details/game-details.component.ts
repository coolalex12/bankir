import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogResult, GameDetails, Gamer, UserBuy } from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BalanceEditorDialogComponent } from '../balance-editor-dialog/balance-editor-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class GameDetailsComponent {
  constructor(
    private readonly gameStoreFacade: GameStoreFacade,
    private readonly dialog: MatDialog
  ) {}

  public gameDetails$: Observable<GameDetails | undefined> = this
    .gameStoreFacade.gameDetails$;

  public addBuy(gamer: Gamer, nominal: number): void {
    this.gameStoreFacade.addBuy(gamer, nominal);
  }

  public removeBuy(gamer: Gamer, nominal: number): void {
    this.gameStoreFacade.removeBuy(gamer, nominal);
  }

  public calcTransactions(): void {
    this.gameStoreFacade.calculateTransactions();
  }

  public editBalanceBtnClick(userBuy: UserBuy): void {
    const dialogRef = this.dialog.open(BalanceEditorDialogComponent, {
      width: '280px',
      data: { balance: userBuy.balance },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => res !== DialogResult.cancel && typeof res === 'number'),
        untilDestroyed(this)
      )
      .subscribe((result) => {
        this.gameStoreFacade.saveGamerBalance(userBuy.user, result);
      });
  }
}
