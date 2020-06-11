import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, AppState } from './auth.state';
import { featureKey } from './auth.reducer';

const selectAuthState = createFeatureSelector<AppState, State>(featureKey);

export const isInitialized = createSelector(
  selectAuthState,
  (state: State) => state.initialized
);

export const user = createSelector(
  selectAuthState,
  (state: State) => state.user
);

// export const userId = createSelector(
//   user,
//   u => u.userId
// );

export const isAuthenticated = createSelector(
  selectAuthState,
  (state: State) => state.initialized && !!state.user
);
