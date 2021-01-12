import { Component } from '@angular/core';
import { routeTransitionAnimations } from '@app/core/layout/route-transition-animations';

@Component({
  selector: 'app-main-layout',
  template: `
    <div fxLayout="column" style="min-height: 100%;">
      <app-header></app-header>
      <div class="content" [ngClass.xs]="'small'" fxFlex="grow" [@pageFade]>
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  animations: [routeTransitionAnimations]
})
export class MainLayoutComponent { }
