import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';

import { BannerComponent, BannerOutletComponent } from './banner.component';
import { BannerService } from './banner.service';
import { BannerContainerComponent } from './banner-container.component';
import { AlertWrapperComponent } from './alert-wrapper';
import { AlertModule } from '../alert';
import { BannerOverlay } from './banner-overlay';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PortalModule,
    AlertModule,
  ],
  exports: [
    BannerOutletComponent,
    BannerComponent,
  ],
  declarations: [
    BannerComponent,
    BannerOutletComponent,
    AlertWrapperComponent,
    BannerContainerComponent,
  ],
  providers: [ BannerService, BannerOverlay ]
})
export class BannerModule { }
