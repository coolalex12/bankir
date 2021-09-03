import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromGamesList from './reducers/games-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GamesListEffects } from './effects/games-list.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromGamesList.gamesListFeatureKey,
      fromGamesList.reducer
    ),
    EffectsModule.forFeature([GamesListEffects]),
  ],
})
export class GamesListStoreModule {}
