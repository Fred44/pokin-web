import { createAction, props } from '@ngrx/store';

import { User } from '@app/shared/model/user';

export const getUser = createAction(
  '[Users] Get a user',
  props<{ userId: string }>()
);

export const userLoaded = createAction(
  '[Users] Loaded',
  props<{ user: User }>()
);

export type UsersAction = ReturnType<
  typeof getUser |
  typeof userLoaded
>;
