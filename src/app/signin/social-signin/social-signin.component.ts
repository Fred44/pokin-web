import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '@app/core/auth';
import { ServerError } from '@app/shared/model';

@Component({
  selector: 'app-social-signin',
  templateUrl: './social-signin.component.html',
  styleUrls: ['./social-signin.component.scss']
})
export class SocialSigninComponent {

  error: string;
  pending = false;

  constructor(private authService: AuthService, private router: Router) { }

  googleLogin(): void {
    this.pending = true;

    this.authService.signInWithGoogle().then(
      () => {
        this.pending = false;
        this.router.navigate(['pokers']);
      },
      ((error: ServerError) => {
        this.pending = false;
        this.error = error.message;
      })
    );
  }

  facebookLogin(): void {
    console.log('FACEBOOK_SIGNIN');
  }
}
