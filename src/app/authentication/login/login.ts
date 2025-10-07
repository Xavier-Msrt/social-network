import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthForm} from '../auth-form/auth-form';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, AuthForm],
  template: '<app-auth-form type="login" />\n'
})
export class Login {}
