import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Roles } from '../enums';

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles: Roles[] = route.data['roles'] || [];
  const userRole: Roles = authService.getRole(); // Replace with your actual role-fetching logic

  if (requiredRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
