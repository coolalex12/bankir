import { NgModule } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { DB_CHEMA } from './db-shema';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 2,
  objectStoresMeta: [
    {
      store: DB_CHEMA.tables.games.tableName,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        // {
        //   name: 'gamers',
        //   keypath: 'gamers',
        //   options: { unique: false },
        // },
        // {
        //   name: 'test',
        //   keypath: 'testp',
        //   options: { unique: false },
        // },
      ],
    },
  ],
};

@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
})
export class IndexedDbModule {}
