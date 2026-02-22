import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';
import { map, take } from 'rxjs';

/**
 * Prevents authenticated users from accessing login/register pages.
 * Redirects to home if already logged in.
 */
export const guestGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectIsLoggedIn).pipe(
        take(1),
        map((isLoggedIn) => {
            if (!isLoggedIn) {
                return true;
            }
            return router.createUrlTree(['/']);
        })
    );
};
