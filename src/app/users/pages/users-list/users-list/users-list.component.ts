import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { IUser } from '../../../model/iuser';
import { IEditableUser } from '../../../model/ieditableuser';
import { UserService } from '../../../services/user-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule
  ],
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];
  editedUser: IEditableUser = this.createEmptyUser();
  editUserDialog = false;
  loading = true;

  currentUserRole: 'super_admin' | 'admin' | 'user' | null = null;
  rolesList: { label: string, value: string }[] = [];


  constructor(
    private userService: UserService,
    private confirm: ConfirmationService,
    private msg: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserRole = this.userService.getCurrentUserRole();
    this.rolesList = this.getRoleOptions();
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: res => {
        this.users = res.users ?? res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  createEmptyUser(): IEditableUser {
    return {
      _id: '',
      userName: { en: '', ar: '' },
      email: '',
      phone: '',
      address: { en: '', ar: '' },
      role: 'user',
      image: '',
      imageFile: null,
      imagePreview: ''
    };
  }


  onAddUser() {
    this.router.navigate(['/users/insert']);
  }
  onEditUser(user: IUser) {
    this.editedUser = {
      ...this.createEmptyUser(),
      ...user,
      imagePreview: user.image || ''
    };
    this.editUserDialog = true;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.editedUser.imageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.editedUser.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  

  
  onSaveUser() {
    if (!this.editedUser._id) {
      this.msg.add({ severity: 'error', summary: 'Error', detail: 'User ID is missing' });
      return;
    }
  
    const safe = (val: string | undefined | null) => val ?? '';  // Helper function عشان مانفكرش كتير
  
    const formData = new FormData();
    formData.append('userName.en', safe(this.editedUser.userName.en));
    formData.append('userName.ar', safe(this.editedUser.userName.ar));
    formData.append('email', safe(this.editedUser.email));
    formData.append('phone', safe(this.editedUser.phone));
    formData.append('role', safe(this.editedUser.role));
    formData.append('address.en', safe(this.editedUser.address.en));
    formData.append('address.ar', safe(this.editedUser.address.ar));
  
    if (this.editedUser.imageFile) {
      formData.append('image', this.editedUser.imageFile);
    }
  
    this.userService.updateUser(this.editedUser._id, formData).subscribe({
      next: () => {
        this.editUserDialog = false;
        this.loadUsers();
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      },
      error: () => {
        this.loading = false;
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Update failed' });
      },
    });
  }
  
  
  
  

  
  onDeleteUser(userId: string, role: IUser['role']) {
    if (role === 'super_admin' && this.currentUserRole !== 'super_admin') {
      return this.msg.add({ severity: 'error', summary: 'Denied', detail: 'You cannot delete a super admin' });
    }

    this.confirm.confirm({
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users = this.users.filter(u => u._id !== userId);
            this.msg.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully' });
          },
          error: () => {
            this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
          }
        });
      }
    });
  }

  onDeleteAllUsers() {
    this.confirm.confirm({
      message: 'Are you sure you want to delete all users?',
      accept: () => {
        this.users = [];
        this.msg.add({ severity: 'warn', summary: 'Deleted', detail: 'All users deleted' });
      },
    });
  }

  
  getRoleOptions() {
    return this.currentUserRole === 'super_admin'
      ? [
          { label: 'Super Admin', value: 'super_admin' },
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' }
        ]
      : [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' }
        ];
  }

  canEditUser(user: IUser): boolean {
    return this.currentUserRole === 'super_admin' || 
           (this.currentUserRole === 'admin' && user.role !== 'super_admin');
  }

  canDeleteUser(user: IUser): boolean {
    return this.currentUserRole === 'super_admin' || 
           (this.currentUserRole === 'admin' && user.role === 'user');
  }

 
 
  
}
