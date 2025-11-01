import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export function roleGuard(allowedRoles: UserRole[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    // Get roles from route data or use provided roles
    const requiredRoles = (route.data['roles'] as UserRole[]) || allowedRoles;

    // Check if user has any of the required roles
    if (authService.hasAnyRole(requiredRoles)) {
      return true;
    }

    // User doesn't have required role
    return router.createUrlTree(['/unauthorized']);
  };
}

