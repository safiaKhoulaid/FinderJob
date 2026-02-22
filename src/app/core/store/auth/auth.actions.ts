import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { LoginRequest } from '../../models/loginRequest';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ credentials: LoginRequest }>(),
        'Login Success': props<{ user: User }>(),
        'Login Failure': props<{ error: string }>(),

        'Register': props<{ user: User }>(),
        'Register Success': props<{ user: User }>(),
        'Register Failure': props<{ error: string }>(),

        'Logout': emptyProps(),
        'Check Auth': emptyProps(),
    },
});
