import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayState, featureKey, State } from './play.reducer';

const selectFeature = createFeatureSelector<State, PlayState>(featureKey);

export const initialized = createSelector(
  selectFeature,
  (state: PlayState) => state.initialized
);

export const poll = createSelector(
  selectFeature,
  (state: PlayState) => state.poll
);

export const myVote = createSelector(
  selectFeature,
  (state: PlayState) => state.myVote
);
