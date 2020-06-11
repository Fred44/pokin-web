import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div fxLayout="column">
      <div class="content" fxFlex="grow">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class PageLayoutComponent {}
