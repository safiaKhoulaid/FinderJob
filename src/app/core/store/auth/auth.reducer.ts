import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const storedUser = localStorage.getItem('user');
let parsedUser: User | null = null;
try {
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch {
    parsedUser = null;
}

export const initialAuthState: AuthState = {
    user: parsedUser,
    loading: false,
    error: null,
};

export const authReducer = createReducer(
    initialAuthState,

    // Login
    on(AuthActions.login, (state): AuthState => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { user }): AuthState => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }): AuthState => ({
        ...state,
        loading: false,
        error,
    })),

    // Register
    on(AuthActions.register, (state): AuthState => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AuthActions.registerSuccess, (state, { user }): AuthState => ({
        ...state,
        user,
        loading: false,
        error: null,
    })),
    on(AuthActions.registerFailure, (state, { error }): AuthState => ({
        ...state,
        loading: false,
        error,
    })),

    // Logout
    on(AuthActions.logout, (): AuthState => ({
        user: null,
        loading: false,
        error: null,
    })),

    // Check Auth (restore from localStorage)
    on(AuthActions.checkAuth, (state): AuthState => {
        const stored = localStorage.getItem('user');
        let user: User | null = null;
        try {
            user = stored ? JSON.parse(stored) : null;
        } catch {
            user = null;
        }
        return { ...state, user };
    }),
);
