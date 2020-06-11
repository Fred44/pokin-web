import { createAction, props } from '@ngrx/store';

import { PokerInfo, PokerOptions } from '@app/shared/model';

export const load = createAction(
  '[Poker] load info',
  props<{ pokerId: string }>()
);

export const loaded = createAction(
  '[Poker] info loaded',
  props<{ poker: PokerInfo }>()
);

export const create = createAction(
  '[Poker] create',
  props<{ options: PokerOptions }>()
);

export const creationSuccess = createAction(
  '[Poker] creation success',
  props<{ pokerId: string }>()
);

export const remove = createAction(
  '[Poker] remove',
  props<{ pokerId: string }>()
);

export type PokerAction = ReturnType<
  typeof load |
  typeof loaded |
  typeof create |
  typeof creationSuccess |
  typeof remove
>;
