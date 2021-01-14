import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { authSelect, pokerAction, pokerSelect, AppState } from '@app/store';
import { unsubscribe } from '@app/shared';
import { AuthenticatedUser, PokerInfo } from '@app/shared/model';
import { LinkShareComponent } from '@app/shared/components';
import { BannerService } from '@app/shared/components/banner';

import { PokerInfoComponent } from '../info/poker-info.component';

@Component({
  selector: 'app-poker-toolbar',
  templateUrl: './poker-toolbar.component.html',
  styleUrls: ['./poker-toolbar.component.scss']
})
export class PokerToolbarComponent implements OnInit, OnDestroy {

  poker$: Observable<PokerInfo>;
  authUser$: Observable<AuthenticatedUser>;
  iamOwner$: Observable<boolean>;

  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>, private banner: BannerService) {
    this.authUser$ = this.store.pipe(select(authSelect.user));

    this.poker$ = this.store.pipe(
      select(pokerSelect.selectedPoker),
      filter(p => !!p)
    );

    this.iamOwner$ = combineLatest([
      this.authUser$, this.poker$
    ]).pipe(
      map(([user, poker]) => user && poker && user.userId === poker.ownerUid)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  info(): void {
    this.banner.open(PokerInfoComponent, {
      mode: 'push'
    });
  }

  share(poker): void {
    const url = 'https://pokin-dev.web.app/play/' + poker.id;

    if (navigator.share) {
      navigator.share({
        url,
        title: 'This poker is awesome',
        text: 'Join me and give me your guess.'
      });
    } else {
      this.banner.open(LinkShareComponent, { data: url });
    }
  }

  delete(poker): void {
    this.banner.confirm({
      icon: 'delete_forever',
      title: 'Remove poker ' + poker.pokerName,
      text: 'This operation can\'t be undone. Are you sure to continue ?'
    }).afterClosed().subscribe((action: string) => {
      if (action === 'SUBMIT') {
        this.store.dispatch(pokerAction.remove({ pokerId: poker.id }));
      }
    });
  }

}
