import { Injectable } from '@angular/core';
import { GameDetails } from '@app/models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { DB_CHEMA } from './db-shema';

@Injectable({
  providedIn: 'root',
})
export class GameDbService {
  constructor(private readonly dbService: NgxIndexedDBService<GameDetails>) {}

  private readonly gamesTableName = DB_CHEMA.tables.games.tableName;

  public createGame(game: GameDetails): Observable<number> {
    return this.dbService.add(this.gamesTableName, game);
  }

  public getGame(gameId: number): Observable<GameDetails> {
    return this.dbService.getByKey(this.gamesTableName, gameId);
  }
}
