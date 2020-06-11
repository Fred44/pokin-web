import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { AppState, authSelect, operationAction } from '@app/store';
import { PokerInfo, User } from '@app/shared/model';
import { SearchService, UserService } from '@app/core/services';
import { SearchItem } from '../search.model';

@Component({
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {

  pokers$: Observable<SearchItem[]>;

  isAuth$ = this.store.pipe(
    select(authSelect.isAuthenticated)
  );

  searchCtrl = new FormControl();

  constructor(
    private store: Store<AppState>,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    const query = this.searchCtrl.value || '';

    this.store.dispatch(operationAction.start({action: 'search'}));

    this.pokers$ = this.searchService.search(query).pipe(
      switchMap(pokers => {
        if (pokers.length > 0) {
          return forkJoin(pokers.map(p => this.userService.get(p.ownerUid).pipe(
            take(1),
            map(owner => this.toSearchItem(p, owner))
          )) as [Observable<SearchItem>]);
        } else {
          return of<SearchItem[]>([]);
        }
      }),
      tap(() => this.store.dispatch(operationAction.succeed({action: 'search'})))
    );
  }

  toSearchItem(poker: PokerInfo, owner: User): SearchItem {
    return {
      id: poker.id,
      pokerName: poker.pokerName,
      public: poker.public,
      cards: poker.cards,
      cardSet: poker.cardSet,
      owner,
      creationDate: poker.creationDate
    };
  }
}
