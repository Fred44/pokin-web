import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { MainLayoutComponent } from '@app/core/layout';
import { redirectUnauthorizedToLogin } from '@app/core/auth';

import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

const routes: Route[] = [
  {
    path: 'settings',
    component: MainLayoutComponent,
    children: [
      { path: '', component: SettingsPageComponent }
    ],
    data: {
      title: 'settings',
      authGuardPipe: redirectUnauthorizedToLogin
    }
  }
];

@NgModule({
  declarations: [
    SettingsPageComponent,
    ThemeSelectorComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
