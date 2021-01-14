import { Component, Inject, Input } from '@angular/core';

import { BANNER_DATA } from '../banner';
import { BannerRef } from '../banner/banner-ref';

@Component({
  selector: 'app-link-share',
  template: `
    <div class="link-share-container" fxLayout="row">
      <mat-form-field appearance="outline" fxFlex="auto" class="link-field">
        <input matInput [value]="value" [disabled]="true">
        <mat-icon matSuffix>link</mat-icon>
      </mat-form-field>

      <button mat-icon-button class="cp-btn" fxFlexAlign="center" aria-label="copy to clipboard"
              [cdkCopyToClipboard]="value" (click)="this.banner.close()">
        <mat-icon>content_copy</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    input {
      text-overflow: ellipsis;
    }
    .link-share-container {
      padding: 8px;
    }
    ::ng-deep .mat-form-field-wrapper{
      padding-bottom: 0;
    }
    .cp-btn {
      margin-left: 8px;
    }
  `]
})
export class LinkShareComponent {

  @Input()
  value = '';

  constructor(@Inject(BANNER_DATA) public data: any, public banner: BannerRef) {
    this.value = data || '';
  }
}
