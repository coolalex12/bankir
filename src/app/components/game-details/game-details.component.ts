import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  AddBuyDialogData,
  DialogResult,
  GameDetails,
  UserBuy,
} from '@app/models';
import { GameStoreFacade } from '@app/state/game';
import { Observable, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BalanceEditorDialogComponent } from '../balance-editor-dialog/balance-editor-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';
import { AddBuyDialogComponent } from '../add-buy-dialog/add-buy-dialog.component';
import { isNumber } from '@app/utils';

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

  public gamersHasEmptyFields$: Observable<boolean> =
    this.gameStoreFacade.gamersHasEmptyFields$;

  public gameResultsEquals$: Observable<boolean> =
    this.gameStoreFacade.gameResultsEquals$;

  public canCalculateResult$: Observable<boolean> = combineLatest([
    this.gamersHasEmptyFields$,
    this.gameResultsEquals$,
  ]).pipe(
    map(
      ([gamersHasEmptyFields, gameResultsEquals]) =>
        !gamersHasEmptyFields && gameResultsEquals
    )
  );

  public gamerClassName(userBuy: UserBuy) {
    if (!isNumber(userBuy.totalResult)) {
      return '';
    }
    return {
      win: userBuy.totalResult >= 0,
      lose: userBuy.totalResult < 0,
    };
  }

  public isWinner(gamer: UserBuy): boolean {
    return Boolean(gamer.totalResult) && (gamer.totalResult as number) > 0;
  }

  public calcTransactions(): void {
    this.gameStoreFacade.calculateTransactions();
  }

  public goToAddGamers(): void {
    this.gameStoreFacade.redirectToAddGamers();
  }

  public editBalanceBtnClick(userBuy: UserBuy): void {
    const dialogRef = this.dialog.open(BalanceEditorDialogComponent, {
      width: '280px',
      data: { balance: userBuy.balance ?? 0, gamerName: userBuy.user.name },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => res !== DialogResult.cancel && isNumber(res)),
        untilDestroyed(this)
      )
      .subscribe((result) => {
        this.gameStoreFacade.saveGamerBalance(userBuy.user, result);
      });
  }

  public addBuyBtnClick(gamer: UserBuy): void {
    const dialogRef = this.dialog.open<AddBuyDialogComponent, AddBuyDialogData>(
      AddBuyDialogComponent,
      {
        width: '100%',
        maxWidth: '100%',
        data: {
          defaultValue: gamer.lastBuy?.nominal ?? 200,
          gamerName: gamer.user.name,
        },
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter((res) => res !== DialogResult.cancel && isNumber(res)),
        untilDestroyed(this)
      )
      .subscribe((result) => {
        this.gameStoreFacade.addBuy(gamer.user, result);
      });
  }
}
