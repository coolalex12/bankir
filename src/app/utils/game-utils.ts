import { GameDetails, Gamer } from '@app/models';

export const addBuyToGame = (
  game: GameDetails,
  gamerId: number,
  nominal: number
): GameDetails => {
  const clonedGame: GameDetails = JSON.parse(JSON.stringify(game));
  const gamerBuy = clonedGame.gamersBuy.find(
    (item) => item.user.id === gamerId
  );
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
  }

  return clonedGame;
};
