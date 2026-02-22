import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobsState } from './jobs.reducer';

export const selectJobsState = createFeatureSelector<JobsState>('jobs');

export const selectJobs = createSelector(
    selectJobsState,
    (state) => state.jobs
);

export const selectJobsLoading = createSelector(
    selectJobsState,
    (state) => state.loading
);

export const selectJobsError = createSelector(
    selectJobsState,
    (state) => state.error
);
