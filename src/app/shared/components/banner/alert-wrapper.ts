import { Component, Inject } from '@angular/core';

import { BANNER_DATA } from './banner-options';
import { BannerRef } from './banner-ref';

@Component({
  template: `
    <app-alert [type]="data.level"
               [title]="data.title"
               [text]="data.text"
               [icon]="data.icon"
               [hasClose]="data.hasClose"
               (submit)="banner.close('SUBMIT')"
               (close)="banner.close()">
    </app-alert>
  `
})
export class AlertWrapperComponent {

  constructor(@Inject(BANNER_DATA) public data: any, public banner: BannerRef) {}
}
