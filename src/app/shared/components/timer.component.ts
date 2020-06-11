import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeWhile, tap } from 'rxjs/operators';

import { TimerState } from '@app/shared/model';
import { unsubscribe } from '../helpers';

@Component({
  selector: 'app-timer',
  template: `
    <div class="timer-container">
      <span class="time"> {{ toMM(liveTime) | number: '2.0-0' }}:{{ toSS(liveTime) | number: '2.0-0' }} </span>

      <button mat-icon-button *ngIf="!pause && canPauseOrResume()"
              (click)="setPause(true)">
        <mat-icon>pause</mat-icon>
      </button>
      <button mat-icon-button *ngIf="pause && canPauseOrResume()"
              (click)="setPause(false)">
        <mat-icon>play_arrow</mat-icon>
      </button>

      <button mat-icon-button *ngIf="canRestart()"
              (click)="restart()">
        <mat-icon>replay</mat-icon>
      </button>

    </div>
  `
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  state: TimerState;

  @Input()
  startTime: number;

  @Input()
  canControl = false;

  @Output()
  completed = new EventEmitter<void>();

  @Output()
  stateChanged = new EventEmitter<TimerState>();

  state$: BehaviorSubject<TimerState>;
  pause$: Observable<boolean>;
  liveTime$: Observable<number>;

  liveTime = 0;
  pause: boolean;

  private subs: Subscription[] = [];

  constructor() {
    this.state$ = new BehaviorSubject(this.state);

    const filteredState$ = this.state$.pipe(
      filter(state => !!state),
      distinctUntilChanged()
    );

    this.pause$ = filteredState$.pipe(
      map(state => state.pause),
      distinctUntilChanged()
    );
    this.liveTime$ = filteredState$.pipe(
      // tap(s => console.log('TIMER_STATE', s)),
      map(state => ({
        pause: state.pause,
        time: state.time,
        timeNow: this.timeNow(state.time, state.refDate)
      })),
      // tap(s => console.log('TIMER_STATE_NOW', s)),
      switchMap(state => state.pause ? of(state.time) : timer(0, 1000).pipe(
        map((time) => {
          const offset = this.state.time < 0 ? time : -time;
          return state.timeNow + offset;
        }),
        takeWhile(t => t >= 0),
        tap(t => {
          // console.log('TIME', t);
          if ( t === 0 && this.state.time >= 0) {
            this.completed.emit();
          }
        })
      ))
    );
  }

  ngOnInit(): void {
    this.subs.push(
      this.liveTime$.subscribe(t => this.liveTime = t),
      this.pause$.subscribe(p => this.pause = p),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('INPUT_CHANGE', changes, this.state);
    if (changes.state) {
      this.state$.next(this.state);
    }
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  setPause(pause: boolean) {
    const newState = {
      time: this.liveTime,
      refDate: new Date(),
      pause
    };
    this.state$.next(newState);
    this.stateChanged.emit(newState);
  }

  restart() {
    // console.log('RESTART');
    const newState = {
      time: this.startTime,
      refDate: new Date(),
      pause: false
    };
    this.state$.next(newState);
    this.stateChanged.emit(newState);
  }

  toMM(seconds: number): number {
    return Math.floor(seconds / 60);
  }

  toSS(seconds: number): number {
    return seconds % 60;
  }

  canPauseOrResume(): boolean {
    return this.canControl && this.liveTime > 0 && this.state.time >= 0;
  }

  canRestart(): boolean {
    return this.liveTime === 0 && this.startTime > 0 && this.canControl;
  }

  private timeNow(time = -1, from = new Date()): number {
    const now = new Date();
    const elapse = Math.floor((now.getTime() - from.getTime()) / 1000);

    if (time < 0) {
      return elapse;

    } else {
      const diff = time - elapse;
      return diff > 0 ? diff : 0;
    }
  }
}
