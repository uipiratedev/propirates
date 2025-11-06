import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@propirates/core/auth';

export const routes: Routes = [
  // Public routes with PublicLayout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/public/landing/landing.component').then((m) => m.LandingComponent),
        data: { featureTag: 'Public/Landing' },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/public/about/about.component').then((m) => m.AboutComponent),
        data: { featureTag: 'Public/About' },
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./pages/public/terms/terms.component').then((m) => m.TermsComponent),
        data: { featureTag: 'Public/Terms' },
      },
      {
        path: 'apply-now',
        loadComponent: () =>
          import('./pages/public/apply-now/apply-now.component').then((m) => m.ApplyNowComponent),
        data: { featureTag: 'Public/ApplyNow' },
      },
      {
        path: 'how-it-works',
        loadComponent: () =>
          import('./pages/public/how-it-works/how-it-works.component').then(
            (m) => m.HowItWorksComponent
          ),
        data: { featureTag: 'Public/HowItWorks' },
      },
      {
        path: 'how-refund-works',
        loadComponent: () =>
          import('./pages/public/how-refund-works/how-refund-works.component').then(
            (m) => m.HowRefundWorksComponent
          ),
        data: { featureTag: 'Public/HowRefundWorks' },
      },
      {
        path: 'start-application',
        loadComponent: () =>
          import('./pages/public/start-application/start-application.component').then(
            (m) => m.StartApplicationComponent
          ),
        data: { featureTag: 'Public/StartApplication' },
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/public/pricing/pricing').then((m) => m.Pricing),
        data: { featureTag: 'Public/Pricing' },
      },
      {
        path: 'features',
        loadComponent: () => import('./pages/public/features/features').then((m) => m.Features),
        data: { featureTag: 'Public/Features' },
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/public/contact/contact').then((m) => m.Contact),
        data: { featureTag: 'Public/Contact' },
      },
      {
        path: 'privacy',
        loadComponent: () => import('./pages/public/privacy/privacy').then((m) => m.Privacy),
        data: { featureTag: 'Public/Privacy' },
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/public/blog/blog').then((m) => m.Blog),
        data: { featureTag: 'Public/Blog' },
      },
    ],
  },

  // Auth routes (no layout)
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
    data: { featureTag: 'Auth/Login' },
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/auth/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
    data: { featureTag: 'Auth/Unauthorized' },
  },

  // App routes with AppLayout (authenticated)
  {
    path: 'app',
    loadComponent: () => import('./layouts/app-layout/app-layout').then((m) => m.AppLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/app/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: { featureTag: 'App/Dashboard' },
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/app/admin/admin.component').then((m) => m.AdminComponent),
        canActivate: [roleGuard(['admin'])],
        data: { featureTag: 'App/Admin', roles: ['admin'] },
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/app/projects/projects').then((m) => m.Projects),
        data: { featureTag: 'App/Projects' },
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/app/profile/profile').then((m) => m.Profile),
        data: { featureTag: 'App/Profile' },
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/app/settings/settings').then((m) => m.Settings),
        data: { featureTag: 'App/Settings' },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
