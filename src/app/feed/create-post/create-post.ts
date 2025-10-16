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
  error: boolean = false;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2000)
    ])
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
          this.error = true;
        }
      });
    }else{
      this.error = true;
    }
  }
}
