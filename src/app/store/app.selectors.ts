import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { AppState } from './app.state';

export const router = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<any>
  >('router');

export const {
  selectRouteData,
  selectUrl
} = fromRouter.getSelectors(router);
