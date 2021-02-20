import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailsResolver } from './resolvers/game-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game/1', // !!debug!!
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'game/:id',
    component: GameDetailsComponent,
    resolve: { data: GameDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
