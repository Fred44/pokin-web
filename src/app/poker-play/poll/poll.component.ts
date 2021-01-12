import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AppState, authSelect, playAction, playSelect, pokerSelect } from '@app/store';
import { unsubscribe } from '@app/shared';
import { Poll, User, Vote } from '@app/shared/model';
import { UserService } from '@app/core/services';

@Component({
  selector: 'app-poker-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, OnDestroy {

  initialized$ = this.store.pipe(select(playSelect.initialized));
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
    map(([user, poker]) => user && poker && user.userId === poker.ownerUid)
  );

  playersVote$: Observable<UIVote[]>;
  votedCards$: Observable<string[]>;
  voteCount$: Observable<number>;

  votesVisible = false;
  noVote = false;

  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>, private userService: UserService) {

    this.playersVote$ = this.poll$.pipe(
      filter(p => !!p),
      map((poll: Poll) => [...poll.votes].sort(compareVoteByDate)),
      switchMap(votes =>
        votes.length > 0 ? forkJoin(votes.map(v => this.userService.get(v.userId).pipe(
          take(1),
          map(user => {
            return {
              ...v,
              user
            };
          })
        ))) : of([])
      )
    );
    this.votedCards$ = this.playersVote$.pipe(
      map(votes => votes.map(v => v.card))
    );
    this.voteCount$ = this.playersVote$.pipe(
      map(votes => votes.length)
    );
  }

  showVotes(show: boolean) {
    this.store.dispatch(playAction.showVotes({ show }));
  }

  clearVotes() {
    this.store.dispatch(playAction.clearVotes());
  }

  trackByUser(i, vote: Vote) {
    return vote.userId;
  }

  ngOnInit(): void {
    this.subs.push(
      this.poll$.subscribe(poll => {
        this.votesVisible = poll.votesAreShown;
      }),

      this.playersVote$.subscribe(votes => {
        this.noVote = !votes || votes.length === 0;
      }),
    );
  }

  ngOnDestroy() {
    unsubscribe(this.subs);
  }
}

export interface UIVote extends Vote {
  user: User;
}

function compareVoteByDate(v1: Vote, v2: Vote): number {
  return v2.at?.getTime() - v1.at?.getTime();
}
