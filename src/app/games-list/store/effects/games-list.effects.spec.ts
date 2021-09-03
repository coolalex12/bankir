import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GamesListEffects } from './games-list.effects';

describe('GamesListEffects', () => {
  let actions$: Observable<any>;
  let effects: GamesListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamesListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GamesListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
