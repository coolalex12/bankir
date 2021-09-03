import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesListRoutingModule } from './games-list-routing.module';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesListPageComponent } from './containers/games-list-page/games-list-page.component';
import { MaterialModule } from '@app/material/material.module';
import { GamesListStoreModule } from './store/games-list-store.module';

@NgModule({
  declarations: [GamesListComponent, GamesListPageComponent],
  imports: [
    CommonModule,
    GamesListRoutingModule,
    MaterialModule,
    GamesListStoreModule,
  ],
})
export class GamesListModule {}
