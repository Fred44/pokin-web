import { State, initialState } from './users.state';
import { createReducer, on } from '@ngrx/store';

import * as usersAction from './users.actions';

export const featureKey = 'users';

const usersReducer = createReducer(initialState,

  on(usersAction.userLoaded, (state, { user }) => ({
    ...state,
    [user.userId]: user
  })),
);

export function reducer(state: State | undefined, action: usersAction.UsersAction) {
  return usersReducer(state, action);
}
