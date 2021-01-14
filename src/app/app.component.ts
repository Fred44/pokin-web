import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { unsubscribe } from '@app/shared';
import { BannerService } from '@app/shared/components/banner';
import { AppState, settingsSelect } from '@app/store';

import { ThemeService } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-wrapper" fxFill>
      <app-alert *ngIf="showPwaAlert"
                 type="info" icon="info"
                 [hasClose]="true" (close)="showPwaAlert = false"
                 title="Hey it's installable">
        To install the app, tap "Share" icon below and select "Add to Home Screen".
      </app-alert>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-wrapper {
      height: 100%;
      width: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  curTheme: string;

  theme$ = this.store.pipe(
    select(settingsSelect.theme),
    map(theme => theme.toLowerCase())
  );

  showPwaAlert = this.pwaAlert();

  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private banner: BannerService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.subs.push(

      this.theme$.subscribe(theme => {
        if (this.curTheme) {
          this.renderer.removeClass(document.body, this.curTheme);
        }
        this.renderer.addClass(document.body, theme);
        this.curTheme = theme;
        this.setChartTheme(theme);
      })
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  private pwaAlert(): boolean {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator);

    return isIos() && !isInStandaloneMode();
  }

  private setChartTheme(value) {
    let overrides: ChartOptions;
    if (value === 'dark-theme') {
      overrides = {
        legend: {
          labels: { fontColor: 'white' }
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }],
          yAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }]
        }
      };
    } else {
      overrides = {};
    }
    this.themeService.setColorschemesOptions(overrides);
  }
}
