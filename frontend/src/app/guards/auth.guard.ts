import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  /* logged in → allow navigation */
  if (auth.isLoggedIn) return true;

  /* logged out → build a redirect to /login?returnUrl=<original path> */
  return router.createUrlTree(
    ['/login'],
    { queryParams: { returnUrl: state.url } }
  );
};
