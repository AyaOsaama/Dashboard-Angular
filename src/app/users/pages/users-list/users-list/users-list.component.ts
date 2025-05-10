import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user-list.service.js';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
  ],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private confirm: ConfirmationService,
    private msg: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users ?? res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  onAddUser() {
    this.router.navigate(['/users/insert']);
  }

  onDeleteAllUsers() {
    this.confirm.confirm({
      message: 'Are you sure you want to delete all users?',
      accept: () => {
        this.users = [];
        this.msg.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'All users deleted',
        });
      },
    });
  }
}
