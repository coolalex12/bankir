import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './state';
import { UsersComponent } from './components/users/users.component';
import { CommonModule } from '@angular/common';
import { IndexedDbModule } from './db/indexed-db.module';
import { GameEffects } from './state/game/game.effects';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, UsersComponent, GameDetailsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    IndexedDbModule,
    EffectsModule.forRoot([GameEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }) : [],
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
