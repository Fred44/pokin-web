import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PokerService } from '@app/core/services';
import { AppState } from '../app.state';
import { operationAction } from '../operation';
import * as pokerAction from './poker.actions';

@Injectable()
export class PokerEffects {

  loadInfo$ = createEffect(() => this.actions$.pipe(
    ofType(pokerAction.load),
    switchMap(({ type, pokerId }) =>
      this.pokerService.getInfo(pokerId).pipe(
        take(1),
        switchMap(poker => {
          if (poker) {
            return [
              operationAction.succeed({ action: type }),
              pokerAction.loaded({ poker })
            ];
          } else {
            return [operationAction.error({ action: type, error: {
              code: 'NOT_FOUND',
              message: 'The poker you try to load doesn\'t exists.'
            }})];
          }
        }),
        catchError(error => of(operationAction.error({ action: type, error })))
      )
    )
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(pokerAction.create),
    switchMap(({ type, options }) =>
      this.pokerService.createNewPoker(options).pipe(
        tap((pokerId) => this.router.navigate(['play', pokerId])),
        switchMap((pokerId) => [
          operationAction.succeed({ action: type }),
          pokerAction.creationSuccess({ pokerId }),
        ]),
        catchError(error => of(operationAction.error({
          action: type,
          error: {
            code: error.status,
            message: error.statusText
          }
        })))
      )
    )
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(pokerAction.remove),
    switchMap(({ type, pokerId }) =>
      this.pokerService.remove(pokerId).pipe(
        map(() => operationAction.succeed({ action: type })),
        tap(() => this.router.navigate(['pokers'])),
        catchError(error => of(operationAction.error({ action: type, error })))
      )
    )
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly pokerService: PokerService,
    private readonly router: Router
  ) {}
}
