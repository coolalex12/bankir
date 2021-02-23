export interface Gamer {
  id: number;
  name: string;
}

export interface SelectableGamer extends Gamer {
  selected: boolean;
}
