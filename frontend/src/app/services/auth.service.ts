import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface UserProfile {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly currentUser = signal<UserProfile | null>(this.getInitialUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  private getInitialUser(): UserProfile | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch (e) {
        console.error('Error reading user from storage:', e);
      }
    }
    return null;
  }

  login(user: UserProfile, rememberMe: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const primaryStorage = rememberMe ? localStorage : sessionStorage;
        primaryStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        // Also keep in localStorage for header cross-tab synchronization
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.error('Error saving user to storage:', e);
      }
    }
    this.currentUser.set(user);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isLoggedIn');
      } catch (e) {
        console.error('Error clearing storage:', e);
      }
    }
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
