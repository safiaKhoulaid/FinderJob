import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';

/**
 * Functional HTTP interceptor for centralized error handling.
 * Shows user-friendly error messages via ToastService.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let message = 'Une erreur est survenue';

            switch (error.status) {
                case 0:
                    message = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
                    break;
                case 401:
                    message = 'Session expirée. Veuillez vous reconnecter.';
                    router.navigate(['/login']);
                    break;
                case 403:
                    message = 'Accès refusé.';
                    break;
                case 404:
                    message = 'Ressource introuvable.';
                    break;
                case 500:
                    message = 'Erreur interne du serveur.';
                    break;
                default:
                    if (error.status >= 400) {
                        message = `Erreur ${error.status}: ${error.statusText || 'Erreur inconnue'}`;
                    }
            }

            console.error(`[HTTP Error] ${error.status} - ${error.url}`, error);
            toast.show(message, 'error');

            return throwError(() => error);
        })
    );
};
