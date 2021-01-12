import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div fxLayout="column" style="min-height: 100%;">
      <app-header></app-header>
      <div class="content" [ngClass.xs]="'small'" fxFlex="grow">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class MainLayoutComponent { }
