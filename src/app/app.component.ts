import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { unsubscribe } from '@app/shared';
import { Layouts } from '@app/shared/model';
import { AppState, rootSelect, settingsSelect } from '@app/store';
import { ThemeService } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div [ngSwitch]="layout" class="app-wrapper">
      <app-page-layout *ngSwitchCase="Layouts.FooterOnly"></app-page-layout>
      <app-main-layout *ngSwitchDefault></app-main-layout>
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

  Layouts = Layouts;
  layout: Layouts;
  curTheme: string;

  theme$ = this.store.pipe(
    select(settingsSelect.theme),
    map(theme => theme.toLowerCase())
  );

  private routeData$ = this.store.pipe(
    select(rootSelect.selectRouteData),
    filter(d => !!d)
  );
  private subs: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.subs.push(
      this.routeData$.subscribe((data: any) => {
        this.layout = data?.layout;
      }),

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
