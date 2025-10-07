import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Authentication} from './authentication/authentication';
import {map} from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authentication);
  const router = inject(Router);

  return auth.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
    })
  );
};
