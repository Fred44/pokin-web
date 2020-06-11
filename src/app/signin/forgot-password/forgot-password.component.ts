import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {

  @Input()
  email = '';

  @Output()
  cancel = new EventEmitter<void>();

  forgotForm: FormGroup;

  error: string;
  isPending = false;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: [this.email, Validators.compose([Validators.required, Validators.email])]
    });
  }

  submit() {
    if (this.forgotForm.valid) {
      console.log('RECOVER', this.forgotForm.value);
      this.isPending = true;
      this.authService.sendPasswordResetEmail(this.forgotForm.value.email).then(
        () => this.isPending = false,
        (err) => {
          console.log('RECOVER_ERROR', err);
          this.isPending = false;
          this.error = err?.message;
        }
      );
    }
  }

  signin(): void {
    this.cancel.emit();
  }

  get emailCtrl() { return this.forgotForm.get('email'); }

  getEmailErrorMessage() {
    return this.emailCtrl.hasError('required') ? 'You must enter your email' :
      this.emailCtrl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
