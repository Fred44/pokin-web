import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, AppState } from './settings.state';
import { featureKey } from './settings.reducer';

const selectSettingsState = createFeatureSelector<AppState, State>(featureKey);

export const settings = createSelector(
  selectSettingsState,
  (state: State) => state
);

export const theme = createSelector(
  settings,
  state => state.theme
);
