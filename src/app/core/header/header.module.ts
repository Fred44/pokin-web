import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileBannerComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
