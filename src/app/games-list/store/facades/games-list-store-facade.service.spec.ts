import { TestBed } from '@angular/core/testing';

import { GamesListStoreFacadeService } from './games-list-store-facade.service';

describe('GamesListStoreFacadeService', () => {
  let service: GamesListStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesListStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
