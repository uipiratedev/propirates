import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@propirates/core/auth';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then((m) => m.LandingComponent),
    data: { featureTag: 'Public/Landing' },
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    data: { featureTag: 'Public/Home' },
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent),
    data: { featureTag: 'Public/About' },
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    data: { featureTag: 'Public/Login' },
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    data: { featureTag: 'Public/Dashboard' },
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [roleGuard(['admin'])],
    data: { featureTag: 'Public/Admin', roles: ['admin'] },
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
    data: { featureTag: 'Public/Unauthorized' },
  },
  {
    path: 'apply-now',
    loadComponent: () => import('./apply-now/apply-now.component').then((m) => m.ApplyNowComponent),
    data: { featureTag: 'Public/ApplyNow' },
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./how-it-works/how-it-works.component').then((m) => m.HowItWorksComponent),
    data: { featureTag: 'Public/HowItWorks' },
  },
  {
    path: 'terms',
    loadComponent: () => import('./terms/terms.component').then((m) => m.TermsComponent),
    data: { featureTag: 'Public/Terms' },
  },
  {
    path: 'start-application',
    loadComponent: () =>
      import('./start-application/start-application.component').then(
        (m) => m.StartApplicationComponent
      ),
    data: { featureTag: 'Public/StartApplication' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
