import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <div fxLayout="column" fxFill>
      <app-header></app-header>
      <div class="content" fxFlex="grow">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}
