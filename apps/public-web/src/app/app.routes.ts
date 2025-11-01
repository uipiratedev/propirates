import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@propirates/core/auth';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    data: { featureTag: 'Public/Home' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
    data: { featureTag: 'Public/About' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    data: { featureTag: 'Public/Login' },
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    data: { featureTag: 'Public/Dashboard' },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [roleGuard(['admin'])],
    data: { featureTag: 'Public/Admin', roles: ['admin'] },
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
    data: { featureTag: 'Public/Unauthorized' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

