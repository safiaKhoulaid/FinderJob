import { createReducer, on } from '@ngrx/store';
import { Job } from '../../models/job.model';
import { JobsActions } from './jobs.actions';

export interface JobsState {
    jobs: Job[];
    loading: boolean;
    error: string | null;
}

export const initialJobsState: JobsState = {
    jobs: [],
    loading: false,
    error: null,
};

export const jobsReducer = createReducer(
    initialJobsState,

    on(JobsActions.loadJobs, (state): JobsState => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(JobsActions.loadJobsSuccess, (state, { jobs }): JobsState => ({
        ...state,
        jobs,
        loading: false,
        error: null,
    })),

    on(JobsActions.loadJobsFailure, (state, { error }): JobsState => ({
        ...state,
        loading: false,
        error,
    })),

    on(JobsActions.clearJobs, (): JobsState => ({
        ...initialJobsState,
    })),
);
