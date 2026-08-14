import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Hero } from '../hero/hero';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {




}
