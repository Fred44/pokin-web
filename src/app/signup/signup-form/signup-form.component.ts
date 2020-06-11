import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Directive } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { UserRegistration } from '@app/shared/model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<UserRegistration>();

  signupForm: FormGroup;
  hidePasswd = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {validators: passwordValidator});
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.submitted.emit(this.signupForm.value);
    }
  }

  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

}

const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const passwd1 = control.get('password');
  const passwd2 = control.get('confirmPassword');

  // console.log(passwd1.value, passwd2.value);

  return passwd1 && passwd2 && passwd1.value !== passwd2.value ? { passwordMismatch: true } : null;
};

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorDirective, multi: true }]
})
export class PasswordMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordValidator(control);
  }
}
