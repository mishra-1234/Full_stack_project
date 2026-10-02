import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly authService = inject(AuthService);
  isScrolled = false;

  categories: string[] = [
    'Fashion',
    'Electronics',
    'Home & Living',
    'Beauty',
    'Grocery',
    'Handicrafts',
    'Sports',
    'Books',
    'Toys',
    'Jewellery',
  ];

  get userName(): string {
    const user = this.authService.currentUser();
    return user?.name || user?.email?.split('@')[0] || 'User';
  }

  get userRole(): string {
    return this.authService.currentUser()?.role || '';
  }

  get userInitial(): string {
    const name = this.userName;
    return name ? name.charAt(0).toUpperCase() : 'U';
  }

  logout(): void {
    this.authService.logout();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 12;
  }
}
