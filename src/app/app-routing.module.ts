import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { HomeResolver } from './resolvers/home.resolver';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsResolver } from './resolvers/game-details.resolver';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { CreateGameResolver } from './resolvers/create-game.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { data: HomeResolver },
  },
  {
    path: 'users',
    component: UsersComponent,
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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true /*, enableTracing: true*/ }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
