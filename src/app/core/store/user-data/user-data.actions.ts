import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Application } from '../../models/application.model';
import { Favorite } from '../../models/favoriteJob.model';
import { Job } from '../../models/job.model';

export const UserDataActions = createActionGroup({
    source: 'UserData',
    events: {
        // Applications
        'Load Applications': emptyProps(),
        'Load Applications Success': props<{ applications: Application[] }>(),
        'Load Applications Failure': props<{ error: string }>(),

        'Add Application': props<{ application: Partial<Application> }>(),
        'Add Application Success': props<{ application: Application }>(),
        'Add Application Failure': props<{ error: string }>(),

        'Update Application Status': props<{ id: number | string; status: 'pending' | 'accepted' | 'rejected' | 'interview' }>(),
        'Update Application Status Success': props<{ application: Application }>(),
        'Update Application Status Failure': props<{ error: string }>(),

        'Update Application Notes': props<{ id: number | string; notes: string }>(),
        'Update Application Notes Success': props<{ id: number | string; notes: string }>(),
        'Update Application Notes Failure': props<{ error: string }>(),

        'Delete Application': props<{ id: number | string }>(),
        'Delete Application Success': props<{ id: number | string }>(),
        'Delete Application Failure': props<{ error: string }>(),

        // Favorites
        'Load Favorites': emptyProps(),
        'Load Favorites Success': props<{ favorites: Favorite[] }>(),
        'Load Favorites Failure': props<{ error: string }>(),

        'Toggle Favorite': props<{ job: Job }>(),
        'Toggle Favorite Success': props<{ action: string; job: Job; favorite?: Favorite }>(),
        'Toggle Favorite Failure': props<{ error: string }>(),
    },
});
