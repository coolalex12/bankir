import { Buy, GameDetails, Gamer, UserBuy } from '@app/models';

export const addBuyToGame = (
  game: GameDetails,
  gamerId: number,
  nominal: number
): GameDetails => {
  const gamerBuy = game.gamers.find((item) => item.user.id === gamerId);
  if (gamerBuy !== undefined) {
    const buyIndex: number = gamerBuy.buy.findIndex(
      (item) => item.nominal === nominal
    );
    const buy =
      buyIndex !== -1 ? gamerBuy.buy[buyIndex] : { nominal, count: 1 };
    if (buyIndex !== -1) {
      gamerBuy.buy.splice(buyIndex, 1, { ...buy, count: buy.count + 1 });
    } else {
      gamerBuy.buy.push(buy);
    }

    gamerBuy.totalBuy = gamerBuy.buy.reduce((acc, current) => {
      acc += current.count * current.nominal;
      return acc;
    }, 0);

    if (typeof gamerBuy.balance === 'number') {
      gamerBuy.totalResult = gamerBuy.balance - gamerBuy.totalBuy;
    }
    const date = new Date().toISOString();
    gamerBuy.lastBuy = { date, nominal };
  }

  sortGamers(game);
  calculateGameResults(game);
  return game;
};

export const removeBuyFromGame = (
  game: GameDetails,
  gamerId: number,
  nominal: number
): GameDetails => {
  const gamerBuy = game.gamers.find((item) => item.user.id === gamerId);
  if (gamerBuy !== undefined) {
    const buyIndex: number = findLastIndex<Buy>(
      gamerBuy.buy,
      (item) => item.nominal === nominal
    );

    if (buyIndex === -1) {
      return game;
    }

    if (gamerBuy.buy[buyIndex].count > 1) {
      gamerBuy.buy[buyIndex].count--;
    } else {
      gamerBuy.buy.splice(buyIndex, 1);
    }

    gamerBuy.totalBuy = gamerBuy.buy.reduce((acc, current) => {
      acc += current.count * current.nominal;
      return acc;
    }, 0);

    if (typeof gamerBuy.balance === 'number') {
      gamerBuy.totalResult = gamerBuy.balance - gamerBuy.totalBuy;
    }
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
  const defaultNominal = 200;
  const date = new Date().toISOString();
  const buy = gamers.map((item: Gamer) => ({
    user: {
      id: item.id,
      name: item.name,
    },
    buy: [
      {
        nominal: defaultNominal,
        count: 1,
      },
    ],
    totalBuy: defaultNominal,
    lastBuy: {
      nominal: defaultNominal,
      date,
    },
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
    if (typeof current.totalResult === 'number' && current.totalResult > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      game.win! += current.totalResult;
    } else if (
      typeof current.totalResult === 'number' &&
      current.totalResult < 0
    ) {
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
    const dateA = new Date(a.lastBuy?.date);
    const dateB = new Date(b.lastBuy?.date);
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
