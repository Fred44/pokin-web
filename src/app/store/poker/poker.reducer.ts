import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PokerInfo } from '@app/shared/model';
import { AppState } from '../app.state';
import * as pokerAction from './poker.actions';

export const featureKey = 'pokers';

export interface PokersState extends EntityState<PokerInfo> {
  loading: boolean;
}

export interface State extends AppState {
  pokers: PokersState;
}

const adapter: EntityAdapter<PokerInfo> = createEntityAdapter<PokerInfo>();

const initialState: PokersState = adapter.getInitialState({
  loading: false,
});

const pokerReducer = createReducer(
  initialState,

  on(pokerAction.load, (state) => {
    return { loading: true, ...state };
  }),

  on(pokerAction.loaded, (state, { poker }) => {
    return { loading: false, ...adapter.setOne(poker, state)};
  }),
);

export function reducer(state: PokersState | undefined, action: Action) {
  return pokerReducer(state, action);
}

export const selectPokersState = createFeatureSelector<State, PokersState>(featureKey);

const {
  selectEntities,
} = adapter.getSelectors();

export const selectPokerEntities = selectEntities;
