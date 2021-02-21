import { Buy } from './buy.model';
import { Gamer } from './user.model';

export interface GameDetails {
  id?: number;
  date: string;
  gamersBuy: UserBuy[];
}
interface UserBuy {
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
}
