import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PokerInfo, PokerOptions } from '@app/shared/model';
// import * as fsModel from './firestore.model';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PokerService {

  private pokerColl: AngularFirestoreCollection<PokerInfo>;

  constructor(private http: HttpClient, private db: AngularFirestore) {
    this.pokerColl = db.collection('/pokers');
  }

  getInfo(pokerId: string): Observable<PokerInfo> {
    return this.getPokerRef(pokerId).valueChanges().pipe(
      map(p => {
        if (p) {
          return {...p, id: pokerId};
        } else {
          return p;
        }
      })
    );
  }

  createNewPoker(options: PokerOptions): Observable<string> {
    const url: string = environment.apiUrl + '/poker';
    const payload = { pokerOptions: options };

    return this.http.post<any>(url, payload).pipe(
      map(res => res.pokerId)
    );
  }

  remove(pokerId: string): Observable<void> {
    return from(this.getPokerRef(pokerId).delete());
  }

  private getPokerRef(pokerId: string): AngularFirestoreDocument<PokerInfo> {
    return this.db.doc<PokerInfo>('/pokers/' + pokerId);
  }
}
