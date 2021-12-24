import { Injectable } from '@angular/core';
import { GameDetails, GameTransaction, UserBuy } from '@app/models';
import { Observable, of } from 'rxjs';

type TUserBuyWithNotEmptyTotalResults = Omit<UserBuy, 'totalResult'> & {
  totalResult: number;
};

@Injectable({
  providedIn: 'root',
})
export class TransactionsCalculatorService {
  constructor() {}

  public calculate(gameDetails: GameDetails): Observable<GameTransaction[]> {
    const res: GameTransaction[] = [];
    const { winners, losers, totalLose, totalWin } = this.getWinnersAndLosers(
      gameDetails.gamers
    );

    const diff = totalLose - totalWin;
    if (diff !== 0) {
      // TODO обработка ошибки
      // eslint-disable-next-line no-console
      console.log('разница!', diff);
    }

    winners.sort((a, b) => b.totalResult - a.totalResult);
    losers.sort((a, b) => b.totalResult - a.totalResult);

    for (const winner of winners) {
      for (const loser of losers) {
        if (winner.totalResult === 0) {
          break;
        }

        if (loser.totalResult === 0) {
          continue;
        }

        if (winner.totalResult >= loser.totalResult) {
          res.push({
            sender: loser.user,
            recipient: winner.user,
            value: loser.totalResult,
          });
          winner.totalResult -= loser.totalResult;
          loser.totalResult = 0;
        } else {
          res.push({
            sender: loser.user,
            recipient: winner.user,
            value: winner.totalResult,
          });
          loser.totalResult -= winner.totalResult;
          winner.totalResult = 0;
        }
      }
    }
    return of(res);
  }

  private getWinnersAndLosers(allItems: UserBuy[]): {
    losers: TUserBuyWithNotEmptyTotalResults[];
    winners: TUserBuyWithNotEmptyTotalResults[];
    totalWin: number;
    totalLose: number;
  } {
    const winners = [];
    const losers = [];
    let totalWin = 0;
    let totalLose = 0;
    for (const item of allItems) {
      if (item.totalResult === undefined) {
        throw new Error(`у игрока ${item.user.name} не рассчитан результат`);
      }
      if (item.totalResult > 0) {
        winners.push(item);
        totalWin += item.totalResult;
      } else if (item.totalResult < 0) {
        item.totalResult = Math.abs(item.totalResult);
        totalLose += item.totalResult;
        losers.push(item);
      }
    }
    return {
      winners: winners as TUserBuyWithNotEmptyTotalResults[],
      losers: losers as TUserBuyWithNotEmptyTotalResults[],
      totalWin,
      totalLose,
    };
  }
}
