import * as fromGamesList from '../reducers/games-list.reducer';
import { selectGamesListState } from './games-list.selectors';

describe('GamesList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectGamesListState({
      [fromGamesList.gamesListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
