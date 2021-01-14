import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { environment } from '@env/environment';

import { PokerInfo } from '@app/shared/model';
import { AuthService } from '@app/core/auth';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  private index$: Observable<SearchIndex>;

  constructor(private http: HttpClient, auth: AuthService) {

    const url: string = environment.searchUrl;

    this.index$ = auth.getUser().pipe(
      switchMap(() => this.http.get<{ key: string }>(url)),
      map(data => {
        const client = algoliasearch(environment.algolia.appId, data.key);
        return client.initIndex('pokers');
      }),
      shareReplay(1)
    );
  }

  search(query: string): Observable<PokerInfo[]> {
    console.log('SEARCH', query);

    return this.index$.pipe(
      switchMap(idx => {
        return from(idx.search<PokerInfo>(query)).pipe(
          map(resp => resp.hits.map(p => ({ id: p.objectID, ...p })))
        );
      })
    );

    // return this.db.collection<PokerInfo>('/pokers', ref =>
    //   ref
    //   .orderBy('pokerName')
    //   .limit(20)
    //   .startAt(query)
    //   .endAt(query + '\uf8ff')
    // ).valueChanges({idField: 'id'});
  }
}
