import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Job } from '../../models/job.model';
import { SearchFilter } from '../../models/search-filter.model';

export const JobsActions = createActionGroup({
    source: 'Jobs',
    events: {
        'Load Jobs': props<{ filter: SearchFilter }>(),
        'Load Jobs Success': props<{ jobs: Job[] }>(),
        'Load Jobs Failure': props<{ error: string }>(),
        'Clear Jobs': emptyProps(),
    },
});
