import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ServerError, UserRegistration } from '@app/shared/model';
import { AuthService } from '@app/core/auth';

@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {

  isPending = false;
  error: string;


  constructor(private authService: AuthService) { }

  register(registration: UserRegistration) {
    this.isPending = true;

    this.authService.signup(registration).then(
      () => this.isPending = false,
      (err: ServerError) => {
        console.log('SIGNUP_ERROR', err);
        this.error = err.message;
        this.isPending = false;
      }
    );
  }

}
