import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailsResolver } from './resolvers/game-details.resolver';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { CreateGameResolver } from './resolvers/create-game.resolver';
import { AddGamersComponent } from './components/add-gamers/add-gamers.component';
import { GamerHistoryComponent } from './components/gamer-history/gamer-history.component';
import { GamerHistoryResolver } from './resolvers/gamer-history.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@app/games-list/games-list.module').then(
        (m) => m.GamesListModule
      ),
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'game/:gameId/gamer-history/:gamerId',
    component: GamerHistoryComponent,
    resolve: { data: GamerHistoryResolver },
  },
  {
    path: 'game/create',
    component: CreateGameComponent,
    resolve: { data: CreateGameResolver },
  },
  {
    path: 'game/:id',
    component: GameDetailsComponent,
    resolve: { data: GameDetailsResolver },
  },
  {
    path: 'game/:id/add-gamers',
    component: AddGamersComponent,
    resolve: { data: GameDetailsResolver },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true /*enableTracing: true */ }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
