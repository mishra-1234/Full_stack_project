import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface LoginResponse {
  message: string;
  user: {
    id?: string | number;
    name?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
  };
}


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // ---------------- Form model ----------------
  email = '';
  password = '';
  rememberMe = false;

  // ---------------- UI state ----------------
  showPassword = false;
  isLoading = false;
  submitted = false;

  errorMessage = '';
  successMessage = '';

  currentYear = new Date().getFullYear();

  private readonly loginUrl = 'http://localhost:8080/users/login';
  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // ---------------- Validation helpers ----------------

  get isEmailValid(): boolean {
    return this.emailPattern.test(this.email.trim());
  }

  get isPasswordValid(): boolean {
    return this.password.trim().length > 0;
  }

  get isFormValid(): boolean {
    return this.isEmailValid && this.isPasswordValid;
  }

  get showEmailError(): boolean {
    return this.submitted && !this.isEmailValid;
  }

  get showPasswordError(): boolean {
    return this.submitted && !this.isPasswordValid;
  }

  // ---------------- UI actions ----------------

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private resetMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // ---------------- Login flow ----------------

  login(form?: NgForm): void {
    this.submitted = true;
    this.resetMessages();

    if (!this.isFormValid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    const payload = {
      email: this.email.trim(),
      password: this.password,
    };

    this.http.post<LoginResponse>(this.loginUrl, payload).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (err: HttpErrorResponse) => this.handleLoginError(err),
    });
  }

  private handleLoginSuccess(response: LoginResponse): void {
    this.isLoading = false;
    this.successMessage = response?.message || 'Login successful';

    const storage = this.rememberMe ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isLoggedIn', 'true');

    // Small delay so the success state is visible before navigating
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 600);
  }

  private handleLoginError(err: HttpErrorResponse): void {
    this.isLoading = false;

    if (err.status === 401 || err.status === 400 || err.status === 404) {
      this.errorMessage = 'Invalid email or password';
    } else if (err.status === 0) {
      this.errorMessage = 'Unable to reach server. Please check your connection.';
    } else {
      this.errorMessage = 'Something went wrong. Please try again.';
    }
  }
}
