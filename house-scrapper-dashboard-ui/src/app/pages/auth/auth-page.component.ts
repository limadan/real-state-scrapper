import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  providers: [MessageService]
})
export class AuthPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Check if already logged in
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/']);
      return;
    }

    this.loginForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const password = this.loginForm.value.password;
      if (password === 'admin') {
        localStorage.setItem('authToken', 'mock-token');
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome to the dashboard!'
        });
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid password.'
        });
      }
    }
  }
}
