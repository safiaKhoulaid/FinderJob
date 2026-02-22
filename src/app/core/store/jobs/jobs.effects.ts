import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobService } from '../../services/jobs/JobService';
import { JobsActions } from './jobs.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const loadJobsEffect = createEffect(
    (actions$ = inject(Actions), jobService = inject(JobService)) =>
        actions$.pipe(
            ofType(JobsActions.loadJobs),
            switchMap(({ filter }) =>
                jobService.searchJobs(filter).pipe(
                    map((jobs) => JobsActions.loadJobsSuccess({ jobs })),
                    catchError((err) =>
                        of(JobsActions.loadJobsFailure({ error: err.message || 'Erreur de chargement des offres' }))
                    )
                )
            )
        ),
    { functional: true }
);
