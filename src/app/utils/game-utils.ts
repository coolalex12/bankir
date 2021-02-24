import { GameDetails, Gamer } from '@app/models';

export const addBuyToGame = (
  game: GameDetails,
  gamerId: number,
  nominal: number
): GameDetails => {
  const gamerBuy = game.gamersBuy.find((item) => item.user.id === gamerId);
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
    gamerBuy.totalResult = (gamerBuy.balance ?? 0) - gamerBuy.totalBuy;
  }

  calculateGameResults(game);
  return game;
};

export const saveGamerBalance = (
  game: GameDetails,
  gamerId: number,
  balance: number
): GameDetails => {
  const gamerBuy = game.gamersBuy.find((item) => item.user.id === gamerId);
  if (gamerBuy !== undefined) {
    gamerBuy.balance = balance;
    gamerBuy.totalResult = gamerBuy.balance - (Number(gamerBuy.totalBuy) ?? 0);
  }

  calculateGameResults(game);
  return game;
};

export const calculateGameResults = (game: GameDetails): GameDetails => {
  game.totalBuy = game.gamersBuy.reduce((acc, current) => {
    acc += current.totalBuy ?? 0;
    return acc;
  }, 0);

  return game;
};
