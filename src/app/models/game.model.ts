import { Buy } from './buy.model';
import { Gamer } from './user.model';

export interface GameDetails {
  id?: number;
  date: string;
  gamersBuy: UserBuy[];
  totalBuy?: number;
  totalResult?: number;
  lose?: number;
  win?: number;
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
