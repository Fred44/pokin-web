import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { AuthService } from '@app/core/auth';

import * as auth from './auth.actions';
import { AppState } from '../app.state';
import { operationAction } from '../operation';

@Injectable()
export class AuthEffects {

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(auth.getUser),
    switchMap(action => this.authService.getUser().pipe(
      map(user =>
        user ? auth.authenticated({ user }) : auth.notAuthenticated()
      )
    ))
  ));

  signout$ = createEffect(() => this.actions$.pipe(
    ofType(auth.signout),
    switchMap(({ type }) => from(this.authService.signOut()).pipe(
      map(() => operationAction.succeed({ action: type })),
      catchError(error => of(operationAction.error({ error, action: type })))
    ))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
  ) {}

}
