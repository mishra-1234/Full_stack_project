import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 12;
  }
}
