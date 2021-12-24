import { Buy, GameDetails } from '@app/models';

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
  }

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
