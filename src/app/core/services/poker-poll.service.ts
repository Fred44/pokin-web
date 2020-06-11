import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import * as fsModel from './firestore.model';
import { PokerInfo, Poll, PollOptions, TimerState, Vote } from '@app/shared/model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PokerPollService {

  newPoll(poker: PokerInfo, poll: PollOptions): Observable<void> {
    const now = firestore.FieldValue.serverTimestamp();
    const time = !poker.pollDuration ? -1 : moment.duration('00:' + poker.pollDuration).asSeconds();

    return from(this.getPollRef(poker.id, 'current').set({
      id: 'current',
      question: poll.question,
      votesAreShown: false,
      votes: {},
      status: 'RUNNING',
      creationDate: now,
      updateDate: now,
      timer: {
        time,
        refDate: now
      }
    } as fsModel.Poll));
  }

  get(pokerId: string, pollId: string): Observable<Poll> {
    return this.getPollRef(pokerId, pollId).valueChanges().pipe(
      map(poll => {
        if (poll) {
          return {
            pokerId,
            id: pollId,
            question: poll.question,
            votesAreShown: poll.votesAreShown,
            votes: Object.entries<fsModel.Vote>(poll.votes).map(([userId, v]) => ({
              userId,
              card: v.card,
              at: v.at?.toDate()
            })),
            status: poll.status,
            timer: {
              pause: poll.status === 'PAUSED',
              time: poll.timer?.time,
              refDate: poll.timer?.refDate?.toDate()
            },
            creationDate: poll.creationDate?.toDate(),
            updateDate: poll.updateDate?.toDate()
          } as Poll;
        } else {
          return null as Poll;
        }
      })
    );
  }

  getVote(pokerId: string, userId: string): Observable<Vote> {
    console.log('GET_VOTE', pokerId, userId);
    return this.getVoteRef(pokerId, userId).valueChanges().pipe(
      map(v => v ? {
        userId,
        card: v.card,
        at: v.at?.toDate()
      } : null)
    );
  }

  updateTimer(pokerId: string, status: TimerState): Observable<void> {
    console.log('TIMER_UPDATE', pokerId, status);
    const now = firestore.FieldValue.serverTimestamp();

    return from(this.getPollRef(pokerId).update({
      status: status.pause ? 'PAUSED' : 'RUNNING',
      timer: {
        time: status.time,
        refDate: now
      },
      updateDate: now
    } as fsModel.Poll));
  }

  vote(pokerId: string, card: string): Observable<void> {
    const url: string = environment.apiUrl + '/poker/' + pokerId + '/votes';
    const payload = { card };

    return this.http.post<any>(url, payload);
  }

  showVotes(pokerId: string, show: boolean): Observable<void> {
    const url: string = environment.apiUrl + '/poker/' + pokerId + '/showVotes';
    const payload = { show };

    return this.http.post<any>(url, payload);
  }

  clearVotes(pokerId: string): Observable<void> {
    const url: string = environment.apiUrl + '/poker/' + pokerId + '/clearVotes';
    const payload = {};

    return this.http.post<any>(url, payload);
  }

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  private getPokerRef(pokerId: string): AngularFirestoreDocument<fsModel.Poker> {
    return this.db.doc<fsModel.Poker>('/pokers/' + pokerId);
  }

  private getPollRef(pokerId: string, pollId: string = 'current'): AngularFirestoreDocument<fsModel.Poll> {
    return this.db.doc<fsModel.Poll>(`/pokers/${pokerId}/polls/${pollId}`);
  }

  private getVoteRef(pokerId: string, userId: string): AngularFirestoreDocument<fsModel.Vote> {
    return this.db.doc(`/pokers/${pokerId}/votes/${userId}`);
  }
}
