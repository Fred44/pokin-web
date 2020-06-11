import { Injectable } from '@angular/core';
import { User } from '@app/shared/model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';

import { usersAction, usersSelect } from '@app/store/users';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private db: AngularFirestore, private store: Store<any>) {}

  private readonly users$: {[key: string]: Observable<User>} = {};

  get(uid: string): Observable<User> {
    if (this.users$[uid]) {
      return this.users$[uid];
    } else {
      return this.users$[uid] = this.muteFirst(
        this.fetch(uid).pipe(
          tap(u => this.store.dispatch(usersAction.userLoaded({user: u}))),
          share()
        ),
        this.store.pipe(select(usersSelect.user(uid)))
      );
    }
  }

  fetch(uid: string): Observable<User> {
    // console.log('FETCH_USER', uid);
    return this.getUserRef(uid).valueChanges().pipe(
      map(user => ({
        ...user,
        pictureUrl: user.pictureUrl
      }))
    );
  }

  private muteFirst <T, R>(first$: Observable<T>, second$: Observable<R>) {
    return combineLatest([
      first$,
      second$
    ]).pipe(
      map(([a, b]) => b),
      distinctUntilChanged()
    );
  }

  private getUserRef(uid: string): AngularFirestoreDocument<User> {
    return this.db.doc<User>('/users/' + uid);
  }
}
