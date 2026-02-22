import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';
import { map, take } from 'rxjs';

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not logged in.
 */
export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectIsLoggedIn).pipe(
        take(1),
        map((isLoggedIn) => {
            if (isLoggedIn) {
                return true;
            }
            return router.createUrlTree(['/login']);
        })
    );
};
