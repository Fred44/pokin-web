import { createAction, props } from '@ngrx/store';

import { ServerError } from '@app/shared/model';

export const start = createAction('[Operation] start',
  props<{ action: string }>()
);

export const succeed = createAction('[Operation] succeed',
  props<{ action: string }>()
);

export const error = createAction('[Operation] error',
  props<{ action?: string, error: ServerError}>()
);

export type Action = ReturnType<
  typeof start |
  typeof succeed |
  typeof error
  >;
