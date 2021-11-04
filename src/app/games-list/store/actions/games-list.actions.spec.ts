import * as fromGamesList from './games-list.actions';

describe('loadGamesLists', () => {
  it('should return an action', () => {
    expect(fromGamesList.loadGamesLists().type).toBe(
      '[GamesList] Load GamesLists'
    );
  });
});
