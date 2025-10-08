import {Component, inject} from '@angular/core';
import {PostService} from '../post-service';
import {AsyncPipe} from '@angular/common';
import {Navbar} from '../../navbar/navbar';

@Component({
  selector: 'app-feed',
  imports: [
    AsyncPipe,
    Navbar
  ],
  templateUrl: './feed.html',
})
export class Feed {
  postService = inject(PostService);

  posts = this.postService.getPosts();
}
