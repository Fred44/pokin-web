import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from './users.reducer';

import { State, AppState } from './users.state';


const selectUsersState = createFeatureSelector<AppState, State>(featureKey);

export const user = (uid: string) =>
  createSelector(
    selectUsersState,
    (state) => state[uid]
  );
