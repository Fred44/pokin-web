import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState, settingsAction, settingsSelect } from '@app/store';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  theme$ = this.store.pipe(select(settingsSelect.theme));

  constructor(private store: Store<AppState>) { }

  onThemeSelect(theme: string): void {
    this.store.dispatch(settingsAction.themeChanged({ theme }));
  }

  // requestPermission() {
  //   this.afMessaging.requestPermission
  //   .pipe(mergeMapTo(this.afMessaging.tokenChanges))
  //   .subscribe(
  //     () => { console.log('Permission granted!'); },
  //     (error) => { console.error(error); },
  //   );
  // }
  //
  // listen() {
  //   this.afMessaging.messages
  //   .subscribe((message) => { console.log(message); });
  // }
}
