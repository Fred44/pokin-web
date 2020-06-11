import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, concatMap, filter, map, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { PokerPollService } from '@app/core/services';
import { ServerError } from '@app/shared/model';
import * as root from '../app.state';
import * as playAction from './play.actions';
import { operationAction } from '../operation';
import { pokerSelect } from '../poker';
import { authAction, authSelect } from '../auth';

@Injectable()
export class PlayEffects {

  loadPoll$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.load),
    switchMap(({ type, pokerId }) =>
      this.pollService.get(pokerId, 'current').pipe(
        switchMap(poll => [
          operationAction.succeed({ action: type }),
          playAction.pollLoaded({ poll })
        ]),
        catchError(error =>
          of(operationAction.error({action: type, error}))
        )
      )
    )
  ));

  loadMyVote$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.load),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store.pipe(
          select(authSelect.user),
          filter(u => !!u)
        )
      )
    )),
    switchMap(([{ type, pokerId }, user]) => {
      return this.pollService.getVote(pokerId, user.userId).pipe(
        takeUntil(this.store.pipe(select(authSelect.user), skip(1))),
        map(vote =>
          playAction.myVoteLoaded({vote})
        ),
        catchError(error =>
          of(operationAction.error({action: type, error}))
        )
      );
    })
  ));

  newPoll$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.newPoll),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(pokerSelect.selectedPoker)))
    )),
    switchMap(([{ type, options }, poker]) =>
      this.pollService.newPoll(poker, options).pipe(
        map(() =>
          operationAction.succeed({ action: type }),
        ),
        catchError((error: ServerError) =>
          of(operationAction.error({ action: type, error }))
        )
      )
    )
  ));

  vote$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.vote),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(pokerSelect.pokerId)))
    )),
    switchMap(([{ type, card }, pokerId]) =>
      this.pollService.vote(pokerId, card).pipe(
        map(() => operationAction.succeed({action: type})),
        catchError((error: ServerError) =>
          of(operationAction.error({action: type, error}))
        )
      )
    )
  ));

  timerUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.updateTimer),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(pokerSelect.pokerId)))
    )),
    switchMap(([{ type, timer }, pokerId]) =>
      this.pollService.updateTimer(pokerId, timer).pipe(
        map(() => operationAction.succeed({action: type})),
        catchError((error: ServerError) =>
          of(operationAction.error({action: type, error}))
        )
      )
    )
  ));

  showVotes$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.showVotes),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(pokerSelect.pokerId)))
    )),
    switchMap(([{ type, show }, pokerId]) =>
      this.pollService.showVotes(pokerId, show).pipe(
        map(() => operationAction.succeed({action: type})),
        catchError((error: ServerError) =>
          of(operationAction.error({action: type, error}))
        )
      )
    )
  ));

  clearVotes$ = createEffect(() => this.actions$.pipe(
    ofType(playAction.clearVotes),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(pokerSelect.pokerId)))
    )),
    switchMap(([{ type }, pokerId]) =>
      this.pollService.clearVotes(pokerId).pipe(
        map(() => operationAction.succeed({action: type})),
        catchError((error: ServerError) =>
          of(operationAction.error({action: type, error}))
        )
      )
    )
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<root.AppState>,
    private readonly pollService: PokerPollService
  ) {}
}
