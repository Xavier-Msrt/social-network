import {Routes} from '@angular/router';
import {Login} from './authentication/login/login';
import {Home} from './home/home';
import {Register} from './authentication/register/register';
import {Feed} from './feed/feed/feed';
import {authGuard} from './auth-guard';

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
    path: 'register',
    component: Register,
  },
  {
    path: 'feed',
    component: Feed,
    canActivate: [authGuard]
  }
];
