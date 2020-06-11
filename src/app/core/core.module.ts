import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';

import { environment } from '@env/environment';
import { SharedModule } from '@app/shared';

import {
  LocalStorageService, PokerPollService, PokerService, SearchService, UserService
} from './services';
import { AuthModule } from './auth';
import { MainLayoutComponent, PageLayoutComponent } from './layout';
import { HeaderModule } from './header';

@NgModule({
  declarations: [
    PageLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    environment.production ? [AngularFireAnalyticsModule, AngularFirePerformanceModule] : [],
    AngularFirestoreModule,

    AuthModule,
    HeaderModule,
  ],
  providers: [
    LocalStorageService,
    PokerService,
    PokerPollService,
    SearchService,
    UserService,
    environment.production ? [ScreenTrackingService, UserTrackingService, PerformanceMonitoringService] : [],
  ],
  exports: [
    PageLayoutComponent,
    MainLayoutComponent,
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
