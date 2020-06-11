import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { authSelect, AppState } from '@app/store';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss']
})
export class ProfileBannerComponent {

  @Output()
  signout = new EventEmitter<void>();

  user$ = this.store.pipe(select(authSelect.user));

  constructor(private store: Store<AppState>) { }

}
