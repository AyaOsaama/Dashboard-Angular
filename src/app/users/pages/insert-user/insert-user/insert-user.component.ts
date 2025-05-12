import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user-list.service'; 
import { Router } from '@angular/router';
import { IEditableUser } from '../../../model/ieditableuser';
import { ToastModule } from 'primeng/toast';    

@Component({
  selector: 'app-insert-user',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule,ToastModule],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.css',
  providers: [MessageService]
})
export class InsertUserComponent implements OnInit {
  user: IEditableUser = {
    userName: { en: '', ar: '' },
    email: '',
    password: '',
    role: 'user',
    phone: '',
    address: { en: '', ar: '' },
    imageFile: null,
    imagePreview: '',
  };

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.resetUserForm();
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.user.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('userName', JSON.stringify(this.user.userName ?? { en: '', ar: '' }));
    formData.append('email', this.user.email ?? '');
    formData.append('password', this.user.password ?? '');
    formData.append('role', this.user.role ?? 'user');
    formData.append('phone', this.user.phone ?? '');
    formData.append('address', JSON.stringify(this.user.address ?? { en: '', ar: '' }));
  
    if (this.user.imageFile) {
      formData.append('image', this.user.imageFile);
    }
  
    this.userService.addUser(formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'User added successfully',
          detail: 'The user has been successfully added to the system.',
        });
        this.router.navigate(['/users']);
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Failed to add user';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
      }
    });
  
    this.resetUserForm();
  }
  
  

  resetUserForm() {
    this.user = {
      userName: { en: '', ar: '' },
      email: '',
      password: '',
      phone: '',
      role: 'user',
      address: { en: '', ar: '' },
      imageFile: null,
      imagePreview: ''
    };
  }
}
