import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './state';
import { UsersComponent } from './components/users/users.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { IndexedDbModule } from './db/indexed-db.module';
import { GameEffects } from './state/game/game.effects';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { MaterialModule } from './material/material.module';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BalanceEditorDialogComponent } from './components/balance-editor-dialog/balance-editor-dialog.component';
import localeRu from '@angular/common/locales/ru';
import { GameResultsComponent } from './components/game-results/game-results.component';

registerLocaleData(localeRu);
@NgModule({
  declarations: [AppComponent, UsersComponent, GameDetailsComponent, HomeComponent, GamesListComponent, CreateGameComponent, BalanceEditorDialogComponent, GameResultsComponent],
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
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
