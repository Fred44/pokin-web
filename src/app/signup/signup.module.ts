import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { Layouts } from '@app/shared/model';
import { redirectLoggedInToHome } from '@app/core/auth';

import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupFormComponent, PasswordMatchValidatorDirective } from './signup-form/signup-form.component';

const routes: Route[] = [
  {
    path: 'signup',
    component: SignupPageComponent,
    data: { layout: Layouts.FooterOnly, authGuardPipe: redirectLoggedInToHome }
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
