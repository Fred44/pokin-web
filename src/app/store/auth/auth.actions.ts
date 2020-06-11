import { createAction, props } from '@ngrx/store';

import { AuthenticatedUser } from '@app/shared/model';

export const getUser = createAction('[Auth] Get User');

export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ user: AuthenticatedUser }>()
);

export const notAuthenticated = createAction('[Auth] Not Authenticated');

export const loginRedirect = createAction(
  '[Auth] Login Redirect',
  props<{ url: string }>()
);

export const signout = createAction('[Auth] Signout');

export type Action = ReturnType<
  typeof getUser |
  typeof authenticated |
  typeof notAuthenticated |
  typeof loginRedirect |
  typeof signout
>;
