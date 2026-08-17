import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface StatCounter {
  label: string;
  target: number;
  current: number;
  suffix: string;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  rotatingWords: string[] = [
    'handwoven sarees',
    'wireless earbuds',
    'terracotta decor',
    'running sneakers',
    'organic spices',
  ];
  wordIndex = 0;
  private rotationTimer?: ReturnType<typeof setInterval>;

  isFocused = false;
  hasValue = false;

  /** Colours for the swaying bunting flags across the top of the hero */
  buntingColors: string[] = [
    '#ffa630',
    '#ff5470',
    '#8f7bff',
    '#2bb3a3',
    '#ffa630',
    '#ff5470',
    '#8f7bff',
    '#2bb3a3',
    '#ffa630',
    '#ff5470',
    '#8f7bff',
    '#2bb3a3',
  ];

  /** Headline stats — count up from 0 once the page loads */
  stats: StatCounter[] = [
    { target: 12000, suffix: '+', label: 'Sellers', current: 0 },
    { target: 250000, suffix: '+', label: 'Products', current: 0 },
    { target: 500, suffix: '+', label: 'Cities', current: 0 },
    { target: 98, suffix: '%', label: 'Happy Buyers', current: 0 },
  ];

  /** Two rows of category tags scrolling in opposite directions */
  categoryTagsRowA: string[] = [
    'Fashion',
    'Electronics',
    'Home & Living',
    'Beauty',
    'Grocery',
    'Handicrafts',
    'Sports',
  ];
  categoryTagsRowB: string[] = [
    'Jewellery',
    'Books',
    'Toys',
    'Footwear',
    'Furniture',
    'Spices',
    'Art & Decor',
  ];

  private rafId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.rotationTimer = setInterval(() => {
        this.wordIndex = (this.wordIndex + 1) % this.rotatingWords.length;
      }, 2200);

      this.animateStats();
    }
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
    if (this.rafId && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.rafId);
    }
  }

  /** Eases every stat counter from 0 up to its target over ~1.4s */
  private animateStats(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.stats = this.stats.map((stat) => ({
        ...stat,
        current: Math.round(stat.target * eased),
      }));

      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  /** Formats large numbers the Indian way: lakhs (L) and thousands (K) */
  formatStat(value: number): string {
    if (value >= 100000) {
      return (value / 100000).toFixed(1) + 'L';
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }
    return value.toString();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.hasValue = value.length > 0;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}

