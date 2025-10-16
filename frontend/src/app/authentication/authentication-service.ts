import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationCredentials} from './authentication-credentials';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {AuthenticationResponse} from './authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);

  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly API_URL = '/api/v1/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable()


  constructor() {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }


  login(credentials: AuthenticationCredentials): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res)),
      catchError((error) => {
        console.error('[AuthService] Login failed:', error);
        throw error;
      })
    );
  }


  register(data: AuthenticationCredentials): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.API_URL}/register`, data).pipe(
      tap((res) => this.handleAuthSuccess(res)),
      catchError((error) => {
        console.error('[AuthService] Register failed:', error);
        throw error;
      })
    );
  }


  validateSession(): Observable<boolean> {
    const token = this.getAccessToken();
    if (!token) return of(false);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.API_URL}/me`, {}, {headers, observe: 'response'}).pipe(
      map((response) => response.status === 200),
      tap((isValid) => this.updateAuthState(isValid)),
      catchError(() => {
        this.updateAuthState(false);
        return of(false);
      })
    );
  }


  private updateAuthState(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  private handleAuthSuccess(res: AuthenticationResponse): void {
    if (res.accessToken) this.setAccessToken(res.accessToken);
    if (res.refreshToken) this.setRefreshToken(res.refreshToken);
    this.updateAuthState(true);
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.updateAuthState(false);
  }

  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    console.log(localStorage.getItem(this.ACCESS_TOKEN_KEY));
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
}
