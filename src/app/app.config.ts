import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from './core/store/auth/auth.reducer';
import { jobsReducer } from './core/store/jobs/jobs.reducer';
import { userDataReducer } from './core/store/user-data/user-data.reducer';

import * as authEffects from './core/store/auth/auth.effects';
import * as jobsEffects from './core/store/jobs/jobs.effects';
import * as userDataEffects from './core/store/user-data/user-data.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducer,
      jobs: jobsReducer,
      userData: userDataReducer,
    }),
    provideEffects(authEffects, jobsEffects, userDataEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
    }),
  ],
};
