import {Component, EventEmitter, inject, Output} from '@angular/core';
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
  @Output() postAdded = new EventEmitter<void>();
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
      const title = this.form.controls.title.value!;
      const content = this.form.controls.content.value!;

      this.postService.createPost(title, content).subscribe({
        next: () => {
          this.closeModal();
          this.form.reset();
          this.postAdded.emit();
        },
        error: (err) => {
          console.error('error while creating', err);
        }
      });
    }
  }
}
