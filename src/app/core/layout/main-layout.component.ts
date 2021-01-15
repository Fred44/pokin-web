import { Component } from '@angular/core';
import { routeTransitionAnimations } from '@app/core/layout/route-transition-animations';
import { PwaService } from '@app/core/pwa/pwa.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  template: `
    <div fxLayout="column" style="min-height: 100%;">
      <app-install-prompt *ngIf="promptInstall | async"></app-install-prompt>
      <app-header></app-header>
      <div class="content" [ngClass.xs]="'small'" fxFlex="grow" [@pageFade]>
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  animations: [routeTransitionAnimations]
})
export class MainLayoutComponent {

  promptInstall: Observable<boolean>;

  constructor(pwa: PwaService) {
    this.promptInstall = pwa.showPrompt;
  }
}
