import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { CoreModule } from './core';
import { SigninModule } from './signin';
import { SettingsModule } from './settings';
import { SignupModule } from './signup';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store';
import { PokerSearchModule } from './poker-search';
import { ChartsModule } from 'ng2-charts';
import { MainLayoutComponent } from '@app/core/layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,

    CoreModule,
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
