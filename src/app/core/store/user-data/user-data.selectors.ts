import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataState } from './user-data.reducer';

export const selectUserDataState = createFeatureSelector<UserDataState>('userData');

// ── Applications ──
export const selectApplications = createSelector(
    selectUserDataState,
    (state) => state.applications
);

export const selectApplicationsLoading = createSelector(
    selectUserDataState,
    (state) => state.applicationsLoading
);

// ── Favorites ──
export const selectFavorites = createSelector(
    selectUserDataState,
    (state) => state.favorites
);

export const selectFavoritesLoading = createSelector(
    selectUserDataState,
    (state) => state.favoritesLoading
);

export const selectUserDataError = createSelector(
    selectUserDataState,
    (state) => state.error
);
