import { Routes } from '@angular/router';
import {Login} from './login/login';
import { Home } from './home/home';

import { Signup } from './signup/signup';


import { Shop } from './shop/shop';
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },

  {
    path: 'shop',
    component: Shop,
  },
];
