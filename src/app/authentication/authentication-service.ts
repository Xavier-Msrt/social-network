import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationCredentials} from './authentication-credentials';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);


  login(data: AuthenticationCredentials) {
    return this.http.post('/api/v1/auth/login', data);
  }

  register(data: AuthenticationCredentials) {
    return this.http.post('/api/v1/auth/register', data);
  }


  isLoggedIn(): Observable<boolean> {
   if(!this.getAccessToken()) return of(false);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`
    });

    return this.http.post('/api/v1/auth/me', {}, { headers, observe: 'response' }).pipe(
      map((response) => response.status === 200),
      catchError(() => of(false))
    );
  }


  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}
