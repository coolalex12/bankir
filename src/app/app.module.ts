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
import { MaterialModule } from './material/material.module';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BalanceEditorDialogComponent } from './components/balance-editor-dialog/balance-editor-dialog.component';
import localeRu from '@angular/common/locales/ru';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { AddBuyDialogComponent } from './components/add-buy-dialog/add-buy-dialog.component';
import { EntitySelectListComponent } from './components/entity-select-list/entity-select-list.component';
import { AddGamersComponent } from './components/add-gamers/add-gamers.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { GamerHistoryComponent } from './components/gamer-history/gamer-history.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { version } from '../../package.json';
import { MatSnackBar } from '@angular/material/snack-bar';

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    GameDetailsComponent,
    CreateGameComponent,
    BalanceEditorDialogComponent,
    GameResultsComponent,
    AddBuyDialogComponent,
    EntitySelectListComponent,
    AddGamersComponent,
    TransactionsListComponent,
    GamerHistoryComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    IndexedDbModule,
    EffectsModule.forRoot([GameEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        })
      : [],
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private snackBar: MatSnackBar) {
    snackBar.open(`Version: ${version}`, '', {
      duration: 2 * 1000,
    });
  }
}
