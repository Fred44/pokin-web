import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { SharedModule } from '@app/shared';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  imports: [
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,

    SharedModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AuthModule { }
