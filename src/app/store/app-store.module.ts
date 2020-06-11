import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { filter, take } from 'rxjs/operators';

import { environment } from '@env/environment';

import { authAction, authSelect, AuthStoreModule } from './auth';
import { PokerModule } from './poker';
import { SettingsModule } from './settings';
import { metaReducers, ROOT_REDUCERS } from './app.reducer';
import { OperationModule } from './operation';
import { UsersModule } from './users';
import { AppState } from './app.state';
import { PokerPlayModule } from './poker-play';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({}),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'Pokin',
        maxAge: 25
      }),

    OperationModule,
    AuthStoreModule,
    PokerModule,
    PokerPlayModule,
    SettingsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: initStore, deps: [Store], multi: true
    }
  ]
})
export class AppStoreModule { }

export function initStore(store: Store<AppState>) {
  console.log('INIT STORE MODULE ...');
  return () => new Promise(resolve => {
    store.dispatch(authAction.getUser());

    store.pipe(
      select(authSelect.isInitialized),
      filter((isInitialized: boolean) => isInitialized),
      take(1),
    ).subscribe(() => {
      console.log('INIT STORE MODULE DONE');
      resolve(true);
    });
  });
}
