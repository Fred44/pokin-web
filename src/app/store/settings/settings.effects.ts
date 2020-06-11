import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { LocalStorageService } from '@app/core/services';
import * as settingsAction from './settings.actions';
import * as settingsSelect from './settings.selectors';
import { AppState } from '../app.state';

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class SettingsEffects {

  update$ = createEffect(() => this.actions$.pipe(
    ofType(settingsAction.themeChanged),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(settingsSelect.settings)))
    )),
    tap(([action, settings]) =>
      this.localStorageService.setItem(SETTINGS_KEY, settings)
    )
  ), {dispatch: false});

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly localStorageService: LocalStorageService
  ) {}
}
