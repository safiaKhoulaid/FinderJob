import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layoutes/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { profileResolver } from './core/resolvers/profile.resolver';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.Register),
      },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.default),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        resolve: { user: profileResolver },
        loadComponent: () =>
          import('./features/profile/profile').then((m) => m.ProfileComponent),
      },
      {
        path: 'find-jobs',
        loadComponent: () =>
          import('./features/find-jobs/find-jobs').then((m) => m.JobsComponent),
      },
      {
        path: 'favorites',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/favorites/favorites').then((m) => m.FavoritesComponent),
      },
      {
        path: 'candidatures',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/candidatures/candidatures').then((m) => m.ApplicationsComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/blog/blog').then((m) => m.Blog),
      },
      {
        path: 'companies',
        loadComponent: () =>
          import('./features/companies/companies').then((m) => m.CompaniesComponent),
      },
    ],
  },
];
