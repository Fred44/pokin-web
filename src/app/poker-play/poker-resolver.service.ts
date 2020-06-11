import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { pokerAction, pokerSelect, AppState } from '@app/store';

@Injectable()
export class PokerResolverService implements Resolve<string> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Observable<never> {
    const { id } = route.params;

    return this.store.pipe(
      select(pokerSelect.poker(id)),
      tap(data => {
        if (!data) {
          this.store.dispatch(pokerAction.load({ pokerId: id }));
        }
      }),
      filter(data => !!data),
      take(1),
      map(poker => poker.pokerName)
    );
  }

  constructor(private store: Store<AppState>) { }
}
