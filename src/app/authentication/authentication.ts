import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationCredentials} from './authentication-credentials';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private readonly http = inject(HttpClient);

  login(data: AuthenticationCredentials) {
    return this.http.post('/api/v1/auth/login', data);
  }
}
