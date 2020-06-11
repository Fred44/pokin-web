import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '@app/core/auth';
import { unsubscribe } from '@app/shared';
import { ServerError } from '@app/shared/model';

@Component({
  selector: 'app-password-signin',
  templateUrl: './password-signin.component.html',
  styleUrls: ['./password-signin.component.scss']
})
export class PasswordSigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup;

  hidePasswd = true;
  error: string;
  isPending = false;

  @Output()
  forgotPassword = new EventEmitter<string>();

  @Output()
  pending = new EventEmitter<boolean>();

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      rememberMe: [true]
    });

    this.subs.push(
      this.signinForm.valueChanges.subscribe(() => {
        this.error = null;
      }),
    );
  }

  ngOnDestroy(): void {
    unsubscribe(this.subs);
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.isPending = true;
      this.pending.emit(this.isPending);

      this.authService.signInWithEmailAndPassword(this.signinForm.value).then(
        () => {
          this.isPending = false;
          this.pending.emit(this.isPending);

          this.router.navigate(['pokers']);
        },
        ((error: ServerError) => {
          this.isPending = false;
          this.pending.emit(this.isPending);
          this.error = error?.message;
        })
      );
    }
  }

  resetPassword(): void {
    this.forgotPassword.emit(this.email.value);
  }

  get email() { return this.signinForm.get('email'); }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter your email' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
