import { UserBuy } from '../game.model';
import { GameTransaction } from '../transaction.model';

export interface GameDetailsDto {
  id?: number | undefined;
  date: string;
  gamersBuy: UserBuy[];
  totalBuy: number | undefined;
  totalResult: number | undefined;
  lose: number | undefined;
  win: number | undefined;
  transactions: GameTransaction[] | undefined;
}
