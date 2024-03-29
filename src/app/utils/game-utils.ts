import { GameDetails, Gamer, UserBuy } from '@app/models';
import { isNumber } from '@app/utils';

export const addBuyToGame = (
  game: GameDetails,
  gamerId: number,
  nominal: number
): GameDetails => {
  const gamerBuy = game.gamers.find((item) => item.user.id === gamerId);
  const now = Date.now();
  const date = new Date(now).toISOString();

  if (gamerBuy !== undefined) {
    gamerBuy.buy.push({ id: now, nominal, date });

    gamerBuy.totalBuy = gamerBuy.buy.reduce((acc, current) => {
      acc += current.nominal;
      return acc;
    }, 0);

    if (isNumber(gamerBuy.balance)) {
      gamerBuy.totalResult = gamerBuy.balance - gamerBuy.totalBuy;
    }
    gamerBuy.lastBuy = { date, nominal };
  }

  sortGamers(game);
  calculateGameResults(game);
  return game;
};

export const saveGamerBalance = (
  game: GameDetails,
  gamerId: number,
  balance: number
): GameDetails => {
  const gamerBuy = game.gamers.find((item) => item.user.id === gamerId);
  if (gamerBuy !== undefined) {
    gamerBuy.balance = balance;
    gamerBuy.totalResult = gamerBuy.balance - (Number(gamerBuy.totalBuy) ?? 0);
  }

  calculateGameResults(game);
  return game;
};

export const addGamersToGame = (
  gamers: Gamer[],
  game: GameDetails
): GameDetails => {
  const buy = gamers.map((item: Gamer) => ({
    user: {
      id: item.id,
      name: item.name,
    },
    buy: [],
    totalBuy: 0,
  }));

  game.gamers.push(...buy);
  calculateGameResults(game);
  return game;
};

export const calculateGameResults = (game: GameDetails): GameDetails => {
  game.win = 0;
  game.lose = 0;
  game.totalBuy = game.gamers.reduce((acc, current) => {
    acc += current.totalBuy ?? 0;
    if (isNumber(current.totalResult) && current.totalResult > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      game.win! += current.totalResult;
    } else if (isNumber(current.totalResult) && current.totalResult < 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      game.lose! += current.totalResult;
    }
    return acc;
  }, 0);

  game.totalResult = game.win + game.lose;
  return game;
};
export const sortGamers = (game: GameDetails): GameDetails => {
  game.gamers.sort(gamersComparator);
  return game;
};

function gamersComparator(a: UserBuy, b: UserBuy): 0 | 1 | -1 {
  if (Boolean(a.lastBuy?.date) && !Boolean(b.lastBuy?.date)) {
    return 1;
  }

  if (!Boolean(a.lastBuy?.date) && Boolean(b.lastBuy?.date)) {
    return -1;
  }

  if (Boolean(a.lastBuy?.date) && Boolean(b.lastBuy?.date)) {
    const dateA = new Date(a.lastBuy?.date as string);
    const dateB = new Date(b.lastBuy?.date as string);
    const res = dateA > dateB ? 1 : -1;
    return res;
  }

  return 0;
}

export function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
}
