import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectIsLoggedIn = createSelector(
    selectCurrentUser,
    (user) => !!user
);

export const selectUserId = createSelector(
    selectCurrentUser,
    (user) => user?.id
);
