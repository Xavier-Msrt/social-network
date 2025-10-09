import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostService} from '../post-service';

@Component({
  selector: 'app-create-post',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-post.html'
})
export class CreatePost {
  private postService = inject(PostService);
  isModalOpen = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addPost() {
    if (this.form.valid) {
      this.postService.createPost(this.form.controls.title.value!, this.form.controls.content.value!).subscribe();
      this.closeModal();
      this.form.reset();
    }
  }
}
