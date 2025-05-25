import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../../service/post.service';
import { Ieditpost } from '../../../model/ieditpost';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insert-post',
  templateUrl: './insert-post.component.html',
  styleUrl: './insert-post.component.css',
  standalone: true,
  imports: [
    CardModule, ButtonModule, DialogModule, ConfirmDialogModule,
    FormsModule, InputTextModule, CommonModule
  ],
  providers: [MessageService]
})
export class InsertPostComponent {

  newPost: Ieditpost = this.createEmptyPost();
defaultAvatar ='https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_960_720.png';
  constructor(
    private postService: PostService,
    private router: Router,
    private messageService: MessageService
  ) {}

  createEmptyPost(): Ieditpost {
    return {
      _id: '',
      image: '',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
      content: { en: '', ar: '' },
      author: '',
      likes: [],
      comments: [],
      imageFile: null,
      imagePreview: ''
    };
  }

  onImageSelectedForPost(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.newPost.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.newPost.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  onAddPost() {
    const formData = new FormData();
  
    if (this.newPost.imageFile) {
      formData.append('image', this.newPost.imageFile);
    }
  
    formData.append('title', JSON.stringify(this.newPost.title));
    
    formData.append('description', JSON.stringify(this.newPost.description));
  
    formData.append('content', JSON.stringify(this.newPost.content));
  
    formData.append('author', this.newPost.author);
  
    this.postService.addPost(formData).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم إضافة المنشور بنجاح!' });
        this.router.navigate(['/posts']); 
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء إضافة المنشور.' });
      }
    );
  }
  

  onCancel() {
    this.router.navigate(['/posts']); 
  }

}
