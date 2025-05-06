import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/login.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  showError(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: msg,
    });
  }

  login() {
    if (!this.email || !this.password) {
      this.showError('Email and Password are required.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Success',
            detail: 'You have logged in successfully!',
          });
          setTimeout(() => this.router.navigate(['/dashboard']), 1000);
        } else {
          this.showError('Invalid credentials or server error.');
        }
      },
      error: (err) => {
        this.showError(err?.error?.message || 'Invalid email or password');
      },
    });
  }
}
