import {Component, inject} from '@angular/core';
import {PostService} from '../post-service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Navbar} from '../../navbar/navbar';
import {CreatePost} from '../create-post/create-post';

@Component({
  selector: 'app-feed',
  imports: [
    AsyncPipe,
    Navbar,
    CreatePost,
    DatePipe
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
