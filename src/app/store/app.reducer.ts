import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { AppState } from './app.state';
import { initStateFromLocalStorage } from './meta-reducers';

export const metaReducers: MetaReducer<AppState>[] = [ initStateFromLocalStorage ];

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
  >('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer
  })
});
