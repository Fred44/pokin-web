import { createAction, props } from '@ngrx/store';

import { Poll, PollOptions, TimerState, Vote } from '@app/shared/model';

export const newPoll = createAction(
  '[Play] new poll',
  props<{ options: PollOptions }>()
);

export const load = createAction(
  '[Play] load',
  props<{ pokerId: string }>()
);

export const pollLoaded = createAction(
  '[Play] poll loaded',
  props<{ poll: Poll }>()
);

export const myVoteLoaded = createAction(
  '[Play] my vote loaded',
  props<{ vote: Vote }>()
);

export const vote = createAction(
  '[Play] vote',
  props<{ card: string }>()
);

export const updateTimer = createAction(
  '[Play] update timer',
  props<{ timer: TimerState }>()
);

export const showVotes = createAction(
  '[Play] show votes',
  props<{ show: boolean }>()
);

export const clearVotes = createAction('[Play] clear votes');
