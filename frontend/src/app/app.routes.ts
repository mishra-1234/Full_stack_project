import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Signup } from './signup/signup';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';
import { Shop } from './shop/shop';
import { VendorDashboard } from './vendor-dashboard/vendor-dashboard';
import { Sell } from './sell/sell';
import { Help } from './help/help';
import { ForgotPassword } from './forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'shop', component: Shop },
  { path: 'customer-dashboard', component: CustomerDashboard },
  { path: 'vendor-dashboard', component: VendorDashboard },
  { path: 'sell', component: Sell },
  { path: 'help', component: Help },
  { path: 'forgot-password', component: ForgotPassword },
];
