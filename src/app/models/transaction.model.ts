import { Gamer } from './gamer.model';

export interface GameTransaction {
  sender: Gamer;
  recipient: Gamer;
  value: number;
}
