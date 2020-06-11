import { Action, createReducer, on } from '@ngrx/store';
import { Poll, Vote } from '@app/shared/model';

import * as playAction from './play.actions';
import { AppState } from '../app.state';
import { authAction } from '../auth';

export const featureKey = 'play';

export interface PlayState {
  initialized: boolean;
  poll: Poll | undefined;
  myVote: Vote | undefined;
}

export interface State extends AppState {
  play: PlayState;
}

const initialState: PlayState = {
  initialized: false,
  poll: undefined,
  myVote: undefined
};

const playReducer = createReducer(initialState,

  on(playAction.load, () => initialState),

  on(playAction.pollLoaded, (state, { poll }) => {
    return { ...state, initialized: true, poll };
  }),

  on(playAction.myVoteLoaded, (state, { vote }) => ({
    ...state,
    myVote: vote
  })),

  on(authAction.notAuthenticated, (state) => ({
    ...state,
    myVote: undefined
  })),
);

export function reducer(state: PlayState | undefined, action: Action) {
  return playReducer(state, action);
}
