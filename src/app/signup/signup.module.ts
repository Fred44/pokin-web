import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { PageLayoutComponent } from '@app/core/layout';
import { redirectLoggedInToHome } from '@app/core/auth';

import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupFormComponent, PasswordMatchValidatorDirective } from './signup-form/signup-form.component';

const routes: Route[] = [
  {
    path: 'signup',
    component: PageLayoutComponent,
    children: [
      { path: '', component: SignupPageComponent }
    ],
    data: { authGuardPipe: redirectLoggedInToHome }
  }
];

@NgModule({
  declarations: [
    SignupFormComponent,
    SignupPageComponent,
    PasswordMatchValidatorDirective,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SignupModule { }
