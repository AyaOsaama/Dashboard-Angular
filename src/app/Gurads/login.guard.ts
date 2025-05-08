import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if (token) {
    const router = inject(Router);
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
