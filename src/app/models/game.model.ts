import { Buy } from './buy.model';
import { GameDetailsDto } from './dbModels';
import { Gamer } from './gamer.model';
import { GameTransaction } from './transaction.model';

export class GameDetails {
  id: number | undefined;
  date: string;
  gamers: UserBuy[];
  totalBuy: number | undefined;
  totalResult: number | undefined;
  lose: number | undefined;
  win: number | undefined;
  transactions: GameTransaction[] | undefined;

  constructor(date: string, gamers: UserBuy[]) {
    this.date = date;
    this.gamers = gamers;
  }

  static fromDto(gameDto: GameDetailsDto): GameDetails {
    const res = new GameDetails(gameDto.date, gameDto.gamersBuy);

    res.id = gameDto.id;
    res.lose = gameDto.lose;
    res.totalBuy = gameDto.totalBuy;
    res.totalResult = gameDto.totalResult;
    res.transactions = gameDto.transactions;
    res.win = gameDto.win;

    return res;
  }

  static toDto(game: GameDetails): GameDetailsDto {
    const res: GameDetailsDto = {
      date: game.date,
      gamersBuy: game.gamers,
      lose: game.lose,
      win: game.win,
      transactions: game.transactions,
      totalBuy: game.totalBuy,
      totalResult: game.totalResult,
    };

    if (Boolean(game.id)) {
      res.id = game.id;
    }
    return res;
  }
}
export interface UserBuy {
  user: Gamer;
  buy: Buy[];
  /**
   * сколько на руках
   */
  balance?: number;
  /**
   * на сколько закупился
   */
  totalBuy?: number;
  totalResult?: number;
}
