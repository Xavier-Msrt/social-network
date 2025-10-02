import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from '@angular/router';
import {Authentication} from '../authentication';
import {AuthenticationCredentials} from '../authentication-credentials';
import {AuthenticationResponse} from '../authentication-response';

@Component({
  selector: 'app-auth-form',
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './auth-form.html',
})
export class AuthForm {
  loginError = false;

  @Input() type: 'login' | 'register' = 'login';
  authenticationService = inject(Authentication);
  constructor(private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      let credentials: AuthenticationCredentials = {
        username: this.form.controls['username'].value!,
        password: this.form.controls['password'].value!
      }

      this.authenticationService[this.type](credentials).subscribe({
        next: (data) => {
          const response = data as AuthenticationResponse;
          // TODO store the token
          this.router.navigate(['/']);
        },
        error: () => {
          this.loginError = true;
          this.form.reset();
        }
      });
    }
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(128),
      this.passwordStrengthValidator()
    ])
  })

  passwordStrengthValidator() {
    return (control: any) => {
      const password = control.value;
      if (!password) return null;

      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        return null;
      }

      return {passwordStrength: 'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'};
    };
  }

  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }

  get usernameError() {
    return this.username.invalid && (this.username.touched || this.username.dirty);
  }

  get passwordError() {
    return this.password.invalid && (this.password.touched || this.password.dirty);
  }
}
