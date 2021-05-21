import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  AddBuyDialogData,
  DialogResult,
  GameDetails,
  Gamer,
  UserBuy,
} from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BalanceEditorDialogComponent } from '../balance-editor-dialog/balance-editor-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { AddBuyDialogComponent } from '../add-buy-dialog/add-buy-dialog.component';

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

  public gameDetails$: Observable<GameDetails | undefined> =
    this.gameStoreFacade.gameDetails$;

  public gamerClassName(userBuy: UserBuy) {
    if (typeof userBuy.totalResult !== 'number') {
      return '';
    }
    return {
      win: userBuy.totalResult >= 0,
      lose: userBuy.totalResult < 0,
    };
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

  public addBuyBtnClick(gamer: Gamer): void {
    const dialogRef = this.dialog.open<AddBuyDialogComponent, AddBuyDialogData>(
      AddBuyDialogComponent,
      {
        width: '480px',
        data: { defaultValue: 200, gamerName: gamer.name },
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => res !== DialogResult.cancel && typeof res === 'number'),
        untilDestroyed(this)
      )
      .subscribe((result) => {
        if (result > 0) {
          this.gameStoreFacade.addBuy(gamer, result);
        } else {
          this.gameStoreFacade.removeBuy(gamer, -result);
        }
      });
  }
}
