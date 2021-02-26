import { Injectable } from '@angular/core';
import { GameDetails, Gamer } from '@app/models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  public getGames(): Observable<GameDetails[]> {
    return this.dbService.getAll(this.gamesTableName).pipe(map(this.sortGames));
  }

  public updateGame(game: GameDetails): Observable<GameDetails[]> {
    return this.dbService.update(this.gamesTableName, game);
  }

  public getGamers(): Observable<Gamer[]> {
    // TODO
    const gamers = [
      {
        id: 1,
        name: 'Деня',
      },
      {
        id: 2,
        name: 'Таня',
      },
      {
        id: 3,
        name: 'Жека',
      },
      {
        id: 4,
        name: 'Фил',
      },
      {
        id: 5,
        name: 'Лёха',
      },
      {
        id: 6,
        name: 'Саня Т.',
      },
      {
        id: 7,
        name: 'Влад',
      },
    ];
    return of(gamers);
  }

  private sortGames(games: GameDetails[]): GameDetails[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return games.sort((a, b) => b.id! - a.id!);
  }
}
