import { createReducer, on } from '@ngrx/store';
import { Application } from '../../models/application.model';
import { Favorite } from '../../models/favoriteJob.model';
import { UserDataActions } from './user-data.actions';

export interface UserDataState {
    applications: Application[];
    favorites: Favorite[];
    applicationsLoading: boolean;
    favoritesLoading: boolean;
    error: string | null;
}

export const initialUserDataState: UserDataState = {
    applications: [],
    favorites: [],
    applicationsLoading: false,
    favoritesLoading: false,
    error: null,
};

export const userDataReducer = createReducer(
    initialUserDataState,

    // ── Applications ──
    on(UserDataActions.loadApplications, (state): UserDataState => ({
        ...state,
        applicationsLoading: true,
        error: null,
    })),
    on(UserDataActions.loadApplicationsSuccess, (state, { applications }): UserDataState => ({
        ...state,
        applications,
        applicationsLoading: false,
    })),
    on(UserDataActions.loadApplicationsFailure, (state, { error }): UserDataState => ({
        ...state,
        applicationsLoading: false,
        error,
    })),

    on(UserDataActions.addApplicationSuccess, (state, { application }): UserDataState => ({
        ...state,
        applications: [...state.applications, application],
    })),

    on(UserDataActions.updateApplicationStatusSuccess, (state, { application }): UserDataState => ({
        ...state,
        applications: state.applications.map((a) =>
            a.id === application.id ? { ...a, status: application.status } : a
        ),
    })),

    on(UserDataActions.updateApplicationNotesSuccess, (state, { id, notes }): UserDataState => ({
        ...state,
        applications: state.applications.map((a) =>
            a.id === id ? { ...a, notes } : a
        ),
    })),

    on(UserDataActions.deleteApplicationSuccess, (state, { id }): UserDataState => ({
        ...state,
        applications: state.applications.filter((a) => a.id !== id),
    })),

    // ── Favorites ──
    on(UserDataActions.loadFavorites, (state): UserDataState => ({
        ...state,
        favoritesLoading: true,
        error: null,
    })),
    on(UserDataActions.loadFavoritesSuccess, (state, { favorites }): UserDataState => ({
        ...state,
        favorites,
        favoritesLoading: false,
    })),
    on(UserDataActions.loadFavoritesFailure, (state, { error }): UserDataState => ({
        ...state,
        favoritesLoading: false,
        error,
    })),

    on(UserDataActions.toggleFavoriteSuccess, (state, { action, job, favorite }): UserDataState => {
        if (action === 'added' && favorite) {
            return { ...state, favorites: [...state.favorites, favorite] };
        } else {
            return {
                ...state,
                favorites: state.favorites.filter((f) => f.jobId !== job.id),
            };
        }
    }),
);
