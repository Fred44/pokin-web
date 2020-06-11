import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usersAction from './users.actions';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '@app/core/services';

@Injectable()
export class UsersEffects {

  user$ = createEffect(() => this.actions$.pipe(
    ofType(usersAction.getUser),
    switchMap(({ userId }) =>
      this.userService.get(userId).pipe(
        map(user => usersAction.userLoaded({ user })),
      )
    )
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService
  ) {}
}
