import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationsService } from '../../services/applications/applications.service';
import { FavoriteService } from '../../services/favorites/favorites.sevice';
import { UserDataActions } from './user-data.actions';
import { selectUserId } from '../auth/auth.selectors';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

// ── Applications Effects ──

export const loadApplicationsEffect = createEffect(
    (
        actions$ = inject(Actions),
        store = inject(Store),
        appService = inject(ApplicationsService)
    ) =>
        actions$.pipe(
            ofType(UserDataActions.loadApplications),
            withLatestFrom(store.select(selectUserId)),
            switchMap(([, userId]) => {
                if (!userId) {
                    return of(UserDataActions.loadApplicationsFailure({ error: 'Utilisateur non connecté' }));
                }
                return appService.getApplications(userId).pipe(
                    map((applications) =>
                        UserDataActions.loadApplicationsSuccess({
                            applications: applications.map((a) => ({
                                ...a,
                                appliedDate: new Date(a.appliedDate),
                                interviewDate: a.interviewDate ? new Date(a.interviewDate) : undefined,
                            })),
                        })
                    ),
                    catchError((err) =>
                        of(UserDataActions.loadApplicationsFailure({ error: err.message || 'Erreur chargement candidatures' }))
                    )
                );
            })
        ),
    { functional: true }
);

export const addApplicationEffect = createEffect(
    (actions$ = inject(Actions), appService = inject(ApplicationsService)) =>
        actions$.pipe(
            ofType(UserDataActions.addApplication),
            switchMap(({ application }) =>
                appService.addApplication(application as any).pipe(
                    map((app) => UserDataActions.addApplicationSuccess({ application: app })),
                    catchError((err) =>
                        of(UserDataActions.addApplicationFailure({ error: err.message || 'Erreur ajout candidature' }))
                    )
                )
            )
        ),
    { functional: true }
);

export const updateStatusEffect = createEffect(
    (actions$ = inject(Actions), appService = inject(ApplicationsService)) =>
        actions$.pipe(
            ofType(UserDataActions.updateApplicationStatus),
            switchMap(({ id, status }) =>
                appService.updateStatus(id, status).pipe(
                    map((app) => UserDataActions.updateApplicationStatusSuccess({ application: app })),
                    catchError((err) =>
                        of(UserDataActions.updateApplicationStatusFailure({ error: err.message || 'Erreur mise à jour statut' }))
                    )
                )
            )
        ),
    { functional: true }
);

export const updateNotesEffect = createEffect(
    (actions$ = inject(Actions), appService = inject(ApplicationsService)) =>
        actions$.pipe(
            ofType(UserDataActions.updateApplicationNotes),
            switchMap(({ id, notes }) =>
                appService.updateNotes(id, notes).pipe(
                    map(() => UserDataActions.updateApplicationNotesSuccess({ id, notes })),
                    catchError((err) =>
                        of(UserDataActions.updateApplicationNotesFailure({ error: err.message || 'Erreur mise à jour notes' }))
                    )
                )
            )
        ),
    { functional: true }
);

export const deleteApplicationEffect = createEffect(
    (actions$ = inject(Actions), appService = inject(ApplicationsService)) =>
        actions$.pipe(
            ofType(UserDataActions.deleteApplication),
            switchMap(({ id }) =>
                appService.deleteApplication(id).pipe(
                    map(() => UserDataActions.deleteApplicationSuccess({ id })),
                    catchError((err) =>
                        of(UserDataActions.deleteApplicationFailure({ error: err.message || 'Erreur suppression' }))
                    )
                )
            )
        ),
    { functional: true }
);

// ── Favorites Effects ──

export const loadFavoritesEffect = createEffect(
    (actions$ = inject(Actions), favService = inject(FavoriteService)) =>
        actions$.pipe(
            ofType(UserDataActions.loadFavorites),
            switchMap(() =>
                favService.getMyFavorites().pipe(
                    map((favorites) => UserDataActions.loadFavoritesSuccess({ favorites })),
                    catchError((err) =>
                        of(UserDataActions.loadFavoritesFailure({ error: err.message || 'Erreur chargement favoris' }))
                    )
                )
            )
        ),
    { functional: true }
);

export const toggleFavoriteEffect = createEffect(
    (actions$ = inject(Actions), favService = inject(FavoriteService)) =>
        actions$.pipe(
            ofType(UserDataActions.toggleFavorite),
            switchMap(({ job }) =>
                favService.toggleFavorite(job).pipe(
                    map((result: any) =>
                        UserDataActions.toggleFavoriteSuccess({
                            action: result.action,
                            job,
                            favorite: result.action === 'added' ? result.favorite : undefined,
                        })
                    ),
                    catchError((err) =>
                        of(UserDataActions.toggleFavoriteFailure({ error: err.message || 'Erreur favori' }))
                    )
                )
            )
        ),
    { functional: true }
);
