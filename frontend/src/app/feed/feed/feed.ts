import {Component, inject} from '@angular/core';
import {PostService} from '../post-service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Navbar} from '../../navbar/navbar';
import {PostForm} from '../post-form/post-form';

@Component({
  selector: 'app-feed',
  imports: [
    AsyncPipe,
    Navbar,
    PostForm,
    DatePipe,
  ],
  templateUrl: './feed.html',
})
export class Feed {
  postService = inject(PostService);

  posts$ = this.postService.getPosts();

  refresh() {
    this.posts$ = this.postService.getPosts();
  }
}
