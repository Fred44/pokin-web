import { createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as rootSelect from '../app.selectors';

import { selectPokersState, selectPokerEntities } from './poker.reducer';

const {
  selectRouteParam,
} = fromRouter.getSelectors(rootSelect.router);

export const pokerId = selectRouteParam('id');

const pokerEntities = createSelector(
  selectPokersState,
  selectPokerEntities,
);

export const poker = (id: string) => createSelector(
  pokerEntities,
  state => state[id]
);

export const selectedPoker = createSelector(
  pokerEntities,
  pokerId,
  (pokers, id) => pokers[id]
);
