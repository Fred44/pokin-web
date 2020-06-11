import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import * as moment from 'moment';

import { Poll, TimerState } from '@app/shared/model';
import { pokerSelect, AppState, playAction, authSelect, playSelect } from '@app/store';
import { unsubscribe } from '@app/shared';

@Component({
  selector: 'app-my-vote',
  templateUrl: './my-vote.component.html',
  styleUrls: ['./my-vote.component.scss']
})
export class MyVoteComponent implements OnInit, OnDestroy {

  poker$ = this.store.pipe(
    select(pokerSelect.selectedPoker),
    filter(p => !!p),
    take(1)
  );
  poll$: Observable<Poll> = this.store.pipe(
    select(playSelect.poll)
  );
  user$ = this.store.pipe(select(authSelect.user));

  iAmTheOwner$ = combineLatest([this.user$, this.poker$]).pipe(
    map(([user, poker]) => user && poker && user.userId === poker.ownerUid),
  );

  vote$ = this.store.pipe(
    select(playSelect.myVote)
  );

  poll: Poll;
  myVote = null;
  authenticated = false;

  timerState$: Observable<TimerState>;
  startTime$: Observable<number>;
  timesUp = false;

  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>) {

    this.timerState$ = this.poll$.pipe(
      filter(poll => !!poll),
      map(poll => poll.timer),
    );
    this.startTime$ = this.poker$.pipe(
      map(poker => !poker.pollDuration ? -1 : moment.duration('00:' + poker.pollDuration).asSeconds()),
    );
  }

  ngOnInit(): void {
    this.subs.push(
      this.poll$.subscribe(poll => this.poll = poll),

      this.vote$.subscribe(v => v ? this.myVote = v.card : this.myVote = null),

      this.timerState$.subscribe(ts => {
        if (ts && ts.time > 0) {
          this.timesUp = false;
        }
      }),

      this.user$.subscribe(u => this.authenticated = !!u),
    );
  }

  vote(card) {
    if (this.poll.status === 'RUNNING' && !this.timesUp) {
      this.store.dispatch(playAction.vote({ card }));
    }
  }

  timerEnd(): void {
    console.log('TIMES_UP');
    this.timesUp = true;
  }

  updateTimerState(state: TimerState): void {
    this.store.dispatch(playAction.updateTimer({ timer : state }));
  }

  ngOnDestroy() {
    unsubscribe(this.subs);
  }
}
