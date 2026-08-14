import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

type PasswordStrength = 'empty' | 'weak' | 'medium' | 'strong';
@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;

  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private http:HttpClient
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-z\s]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role: [null, [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  // ---- Convenience getters for the template ----
  get fullName() {
    return this.signupForm.get('fullName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get role() {
    return this.signupForm.get('role');
  }

  /** Shows an error state only once the user has interacted with the field. */
  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /** Confirm-password field has its own mismatch check driven by the group validator. */
  get confirmPasswordMismatch(): boolean {
    const control = this.confirmPassword;
    return (
      !!control &&
      (control.touched || control.dirty) &&
      this.signupForm.hasError('passwordMismatch') &&
      !control.hasError('required')
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  selectRole(role: 'customer' | 'vendor'): void {
    this.role?.setValue(role);
    this.role?.markAsTouched();
  }

  /** Lightweight password strength meter used for the visual strength bar. */
  get passwordStrength(): PasswordStrength {
    const value: string = this.password?.value ?? '';
    if (!value) {
      return 'empty';
    }

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  get passwordStrengthLabel(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Good';
      case 'strong':
        return 'Strong 💪';
      default:
        return '';
    }
  }
  onSubmit(): void {
    if (this.signupForm.invalid || this.isSubmitting) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { fullName, email, password, role } = this.signupForm.value;

    const user = {
      name: fullName,
      email: email,
      password: password,
      role: role.toUpperCase()
    };

    this.http.post('http://localhost:8080/users', user).subscribe({

      next: (response) => {

        console.log('Signup successful:', response);

        this.isSubmitting = false;
        this.submitSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: (error) => {

        console.error('Signup failed:', error);

        this.isSubmitting = false;
      }

    });
  }

}
