import { createReducer, on } from '@ngrx/store';

import { Action, authenticated, getUser, notAuthenticated } from './auth.actions';
import { initialState, State } from './auth.state';

const authreducer = createReducer(initialState,

  // on(getUser, state => initialAuthState),

  on(authenticated, (state, { user }) => ({
    ...state,
    initialized: true,
    user
  })),

  on(notAuthenticated, state => ({
    ...initialState,
    initialized: true
  }))
);

export const featureKey = 'auth';

export function reducer(state: State | undefined, action: Action) {
  return authreducer(state, action);
}
