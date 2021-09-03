import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListPageComponent } from './containers/games-list-page/games-list-page.component';
import { GamesListResolver } from './resolvers/games-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: GamesListPageComponent,
    resolve: { data: GamesListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesListRoutingModule {}
