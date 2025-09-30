import {Routes} from '@angular/router';
import {Login} from './authentication/login/login';
import {Home} from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  }
];
