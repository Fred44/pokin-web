import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { SharedModule } from '@app/shared';
import { PageLayoutComponent } from '@app/core/layout';
import { redirectLoggedInToHome } from '@app/core/auth';

import { SigninPageComponent } from './signin-page/signin-page.component';
import { SocialSigninComponent } from './social-signin/social-signin.component';
import { PasswordSigninComponent } from './password-signin/password-signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Route[] = [
  {
    path: 'signin',
    component: PageLayoutComponent,
    children: [
      { path: '', component: SigninPageComponent }
    ],
    data: { authGuardPipe: redirectLoggedInToHome },
    canActivate: [ AngularFireAuthGuard ]
  }
];

@NgModule({
  declarations: [
    SigninPageComponent,
    PasswordSigninComponent,
    SocialSigninComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SigninModule { }
