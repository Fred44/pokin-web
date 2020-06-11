import { createReducer, on } from '@ngrx/store';

import * as settingsAction from './settings.actions';
import { State, initialState } from './settings.state';

const settingsReducer = createReducer(initialState,
  on(settingsAction.themeChanged, (state, { theme }) => ({
    ...state,
    theme
  }))
);

export const featureKey = 'settings';

export function reducer(state: State | undefined, action: settingsAction.SettingsAction) {
  return settingsReducer(state, action);
}
