import { Component } from '@angular/core';

@Component({
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {

  isPending = false;

  showResetPassword = false;
  emailToReset = '';

  showReset(email: string): void {
    this.emailToReset = email;
    this.showResetPassword = true;
  }

  showPassword(): void {
    this.showResetPassword = false;
  }

  showProgress(show: boolean): void {
    this.isPending = show;
  }
}
