import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {Authentication} from '../authentication';
import {AuthenticationCredentials} from '../authentication-credentials';
import {AuthenticationResponse} from '../authentication-response';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, NgClass, NgOptimizedImage, RouterLink],
  templateUrl: './register.html'
})
export class Register {
  authenticationService = inject(Authentication);

  loginError = false;

  constructor(private router: Router){}

  registerForm = new FormGroup({
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



  onSubmit() {
    if (this.registerForm.valid) {
      let credentials: AuthenticationCredentials = {
        username: this.registerForm.controls['username'].value!,
        password: this.registerForm.controls['password'].value!
      }
      this.authenticationService.register(credentials).subscribe({
        next: (data) => {
          const response = data as AuthenticationResponse;
          console.log(response.accessToken);
          this.router.navigate(['/']);
        },
        error: () => {
          this.loginError = true;
          this.registerForm.reset();
        }
      });
    }
  }


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

      return { passwordStrength: 'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.' };
    };
  }


  get username() {
    return this.registerForm.controls.username;
  }
  get password() {
    return this.registerForm.controls.password;
  }

  get usernameError() {
    return this.username.invalid && (this.username.touched || this.username.dirty);
  }

  get passwordError() {
    return this.password.invalid && (this.password.touched || this.password.dirty);
  }
}
