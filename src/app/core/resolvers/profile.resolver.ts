import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/auth/auth.selectors';
import { map, take } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Resolver pour pré-charger les données du profil utilisateur
 * avant d'afficher la page profil.
 */
export const profileResolver: ResolveFn<User | null> = () => {
    const store = inject(Store);

    return store.select(selectCurrentUser).pipe(
        take(1),
        map((user) => user)
    );
};
