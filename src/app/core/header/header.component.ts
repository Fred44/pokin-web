import {
  Component,
  OnInit,
  OnDestroy,
  Type,
  AfterViewInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { operationSelect, authAction, authSelect, AppState, rootSelect } from '@app/store';
import { Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';

import { unsubscribe } from '@app/shared';
import { BannerService } from '@app/shared/components/banner';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  private routeData$ = this.store.pipe(
    select(rootSelect.selectRouteData),
    filter(d => !!d),
    delay(0)
  );

  isHome$ = this.store.pipe(
    select(rootSelect.selectUrl),
    map(url => url === '/' || url === '/pokers')
  );

  authenticated$ = this.store.pipe(select(authSelect.isAuthenticated));
  user$ = this.store.pipe(select(authSelect.user));

  isLoading$ = this.store.pipe(select(operationSelect.isPending));

  error$ = this.store.pipe(select(operationSelect.error));

  isAuthenticated = false;

  showProfile = false;

  pageTitle: string;
  toolbarComponent: Type<Component>;

  private subs: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private banner: BannerService,
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.authenticated$.subscribe(authenticated => this.isAuthenticated = authenticated),

      this.error$.pipe(
        filter(e => !!e),
      ).subscribe(err => {
        this.banner.alert({
          level: 'error',
          title: err.message
        });
      }),
    );
  }

  ngAfterViewInit(): void {
    this.subs.push(
      this.routeData$.subscribe((data: any) => {
        if (data && typeof data.title !== 'undefined') {
          this.pageTitle = data.title;
        } else {
          this.pageTitle = 'pokin';
        }
        this.toolbarComponent = data?.toolbar;
      }),
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  showProfileMenu(): void {
    this.showProfile = true;
  }

  signout(): void {
    this.showProfile = false;
    this.store.dispatch(authAction.signout());
  }
}
