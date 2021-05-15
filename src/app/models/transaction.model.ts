import { Gamer } from './user.model';

export interface GameTransaction {
  sender: Gamer;
  recipient: Gamer;
  value: number;
}
