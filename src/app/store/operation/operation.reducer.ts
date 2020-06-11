import { createReducer, on } from '@ngrx/store';

import { State, initialState } from './operation.state';
import * as operationAction from './operation.actions';
import * as pokerAction from '../poker/poker.actions';
import * as playAction from '../poker-play/play.actions';
import * as authAction from '../auth/auth.actions';

export const featureKey = 'operation';

const operationReducer = createReducer(initialState,

  on(operationAction.start,
    (state, { action }) => ({
    pendingOps: [ ...state.pendingOps, action ]
  })),

  on(pokerAction.load, pokerAction.create, pokerAction.remove,
    playAction.updateTimer, playAction.newPoll, playAction.vote,
    playAction.showVotes, playAction.clearVotes,
    authAction.signout,
  (state, { type }) => ({
    pendingOps: [ ...state.pendingOps, type ]
  })),

  on(operationAction.succeed, (state, { action }) => ({
    pendingOps: ejectOperation(state.pendingOps, action)
  })),

  on(operationAction.error, (state, { action, error }) => ({
    pendingOps: ejectOperation(state.pendingOps, action),
    lastError: {
      action,
      serverError: error
    }
  }))
);

export function reducer(state: State | undefined, action: operationAction.Action) {
  return operationReducer(state, action);
}


function ejectOperation(pendingArr: string[], operation: string): string[] {
  const opIdx = pendingArr.indexOf(operation);
  return [
    ...pendingArr.slice(0, opIdx),
    ...pendingArr.slice(opIdx + 1)
  ];
}
