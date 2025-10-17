import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostService} from '../post-service';
import {Post} from '../post';

@Component({
  selector: 'app-post-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-form.html'
})
export class PostForm {
  private postService = inject(PostService);
  @Input() type: 'create' | 'edit' = 'create';
  @Input() post? : Post;
  @Output() afterAction = new EventEmitter<void>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      this.form.patchValue({
        title: this.post.title,
        content: this.post.content
      });
    }
  }

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
          this.afterAction.emit();
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

  editPost() {
    if (this.form.valid && this.post) {
      const title = this.form.controls.title.value!;
      const content = this.form.controls.content.value!;

      const editedPost: Post = {
        ...this.post,
        title,
        content
      }

      this.postService.editPost(editedPost).subscribe({
        next: () => {
          this.closeModal();
          this.form.reset();
          this.afterAction.emit();
        },
        error: (err) => {
          console.error('error while editing', err);
          this.error = true;
        }
      });
    }else{
      this.error = true;
    }
  }
}
