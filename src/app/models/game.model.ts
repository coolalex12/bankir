import { Buy } from './buy.model';
import { Gamer } from './user.model';

export interface GameDetails {
  id?: number;
  date: string;
  gamers: UserBuy[];
}

interface UserBuy {
  user: Gamer;
  buy: Buy[];
}
