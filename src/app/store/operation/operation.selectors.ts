import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey } from './operation.reducer';
import { AppState, State } from './operation.state';

export const operation = createFeatureSelector<
  AppState,
  State
  >(featureKey);

export const error = createSelector(
  operation,
  (state) => state.lastError?.serverError
);

export const isPending = createSelector(
  operation,
  (state) => state.pendingOps.length > 0
);
