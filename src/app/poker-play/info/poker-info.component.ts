import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

import { AppState, pokerSelect } from '@app/store';
import { UserService } from '@app/core/services';

@Component({
  selector: 'app-poker-info',
  templateUrl: './poker-info.component.html',
  styleUrls: ['./poker-info.component.scss']
})
export class PokerInfoComponent {

  poker$ = this.store.pipe(select(pokerSelect.selectedPoker));

  owner$ = this.poker$.pipe(
    switchMap(poker =>
      this.userService.get(poker.ownerUid).pipe(
        take(1)
      )
    )
  );

  constructor(private store: Store<AppState>, private userService: UserService) {}
}
