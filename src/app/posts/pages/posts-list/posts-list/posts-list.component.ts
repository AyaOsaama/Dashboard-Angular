import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../../../service/post.service'; 
import { Ipost } from '../../../model/ipost';
import { Ieditpost } from '../../../model/ieditpost';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-posts-list',
  imports: [CardModule,ButtonModule,CommonModule,DialogModule,ConfirmDialogModule,FormsModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
  providers: [ConfirmationService, MessageService]  

})
export class PostsListComponent {
  posts: any[] = [];
  loading = true;
  errorMessage = '';
  likesDialogVisible = false;
  commentsDialogVisible = false;
  selectedPost: any = null;
  defaultAvatar = 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg';
  editedPost: Ieditpost = this.createEmptyPost();
  editPostDialog = false;
  constructor(private postService: PostService , private confirmationService: ConfirmationService,
    private messageService: MessageService,private router: Router) {}

  ngOnInit(): void {
  this.loadPosts()
  }
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
      imagePreview: '',
    };
  }
loadPosts(){
  this.postService.getAllPosts().subscribe({
    next: (res) => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      this.posts = res.posts || []; 
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = 'Faild Upload Post ';
      this.loading = false;
    }
  });
}
  openLikesDialog(post: any) {
    this.selectedPost = post;
    this.likesDialogVisible = true;
  }
  
  openCommentsDialog(post: any) {
    this.selectedPost = post;
    this.commentsDialogVisible = true;
  }
  onDeletePost(post: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete post "${post.title.en}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.postService.deletePost(post._id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `${post.title.en} deleted successfully!`
            });
            this.loadPosts(); 
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete post'
            });
            this.loading = false;
          }
        });
      }
    });
  }

  onEditPost(post: Ipost & { _id: string }) {
    this.editedPost = {
      ...this.createEmptyPost(),
      ...post,
      imagePreview: post.image || ''
    };
    this.editPostDialog = true;
  }
  
  onImageSelectedForPost(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
  
    this.editedPost['imageFile'] = file;
    const reader = new FileReader();
    reader.onload = () => this.editedPost['imagePreview'] = reader.result as string;
    reader.readAsDataURL(file);
  }
  onSavePost() {
    const safe = (val: string | undefined | null) => val ?? '';
  
    const formData = new FormData();
    formData.append('title.en', safe(this.editedPost.title.en));
    formData.append('title.ar', safe(this.editedPost.title.ar));
    formData.append('description.en', safe(this.editedPost.description.en));
    formData.append('description.ar', safe(this.editedPost.description.ar));
    formData.append('content.en', safe(this.editedPost.content.en));
    formData.append('content.ar', safe(this.editedPost.content.ar));
    formData.append('author', safe(this.editedPost.author));
  
    if (this.editedPost.imageFile) {
      formData.append('image', this.editedPost.imageFile);
    }
  
    this.postService.updatePost(this.editedPost._id, formData).subscribe({
      next: () => {
        this.editPostDialog = false;
        this.loadPosts();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post updated successfully' });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed' });
      }
    });
  }
  
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
  
    this.editedPost.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.editedPost.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }
  
}
