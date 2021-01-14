import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <div fxLayout="column" fxFill>
      <div class="content" fxFlex="grow">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class PageLayoutComponent {}
