import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChartsModule } from 'ng2-charts';

import { MainLayoutComponent } from '@app/core/layout';
import { SharedModule } from '@app/shared';
import { CoreModule } from './core';
import { SigninModule } from './signin';
import { SettingsModule } from './settings';
import { SignupModule } from './signup';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store';
import { PokerSearchModule } from './poker-search';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,

    CoreModule,
    SharedModule,
    AppStoreModule,

    PokerSearchModule,
    SigninModule,
    SignupModule,
    SettingsModule,

    RouterModule.forRoot([
      {
        path: 'new',
        component: MainLayoutComponent,
        loadChildren: () => import('./poker-new/poker-new.module').then(m => m.PokerNewModule),
      },
      {
        path: 'play',
        component: MainLayoutComponent,
        loadChildren: () => import('./poker-play/poker-play.module').then(m => m.PokerPlayModule),
      },
      {path: '', redirectTo: '/pokers', pathMatch: 'full'}
    ], { enableTracing: false }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
