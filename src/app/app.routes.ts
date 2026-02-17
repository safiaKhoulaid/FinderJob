import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import Login from './features/auth/login/login';
import { HomeComponent } from './features/home/home';
import { MainLayoutComponent } from './layoutes/main-layout/main-layout';
import { ProfileComponent } from './features/profile/profile';
import { JobsComponent } from './features/find-jobs/find-jobs';
import { FavoritesComponent } from './features/favorites/favorites';
import { ApplicationsComponent } from './features/candidatures/candidatures';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: '',
        component: HomeComponent
      },

      {
        path: 'register',
        component: Register
      },

      {
        path: 'login',
        component: Login
      },

      {
        path: 'profile',
        component: ProfileComponent
      },

      {
        path: 'find-jobs',
        component: JobsComponent
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'candidatures',
        component: ApplicationsComponent
      }
    ]
  }]
