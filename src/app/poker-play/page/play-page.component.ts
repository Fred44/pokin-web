import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { unsubscribe } from '@app/shared';
import { AuthenticatedUser, PokerInfo, Poll } from '@app/shared/model';
import {
  pokerSelect,
  playAction,
  playSelect,
  authSelect,
  AppState,
} from '@app/store';


@Component({
  templateUrl: './play-page.component.html'
})
export class PlayPageComponent implements OnInit, OnDestroy {

  initialized$: Observable<boolean>;
  poker$: Observable<PokerInfo>;
  poll$: Observable<Poll>;
  user$: Observable<AuthenticatedUser>;

  pollIsActive = false;
  iAmOwner = false;

  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    this.poker$ = this.store.pipe(
      select(pokerSelect.selectedPoker),
      filter(p => !!p),
      take(1)
    );

    this.initialized$ = this.store.pipe(select(playSelect.initialized));
    this.user$ = this.store.pipe(select(authSelect.user));
    this.poll$ = this.store.pipe(select(playSelect.poll));
  }

  ngOnInit(): void {
    this.subs.push(
      this.poker$.subscribe(poker => {
        if (poker) {
          this.store.dispatch(playAction.load({ pokerId: poker.id }));
        }
      }),

      combineLatest([this.user$, this.poker$]).pipe(
        map(([user, poker]) => user && poker && user.userId === poker.ownerUid)
      ).subscribe(iamOwner => this.iAmOwner = iamOwner),

      this.poll$.subscribe(
      poll => this.pollIsActive = !!poll
      ),
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }
}
