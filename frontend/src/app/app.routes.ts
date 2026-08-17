import { Routes } from '@angular/router';
import {Login} from './login/login';
import { Home } from './home/home';

import { Signup } from './signup/signup';
import { ForgotPassword } from './forgot-password/forgot-password';

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
    path: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'shop',
    component: Shop,
  },
];
