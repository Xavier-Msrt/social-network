import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication-service';
import {Observable} from 'rxjs';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthenticationService);


  getPosts():Observable<Post[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });

    return this.http.get<Post[]>('/api/v1/posts', { headers });
  }

}
