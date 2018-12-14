import { Action, State, StateContext } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from '../services/auth';
import { LoginAction, LogoutAction } from './actions';
import { ResetStateAction } from 'src/app/bank/state/actions';
import { LoginSuccessfulEvent, LoginFailedEvent, LogoutSuccessfulEvent, LoggedOutFailedEvent } from 'src/app/shared/state/events';
export class AuthStateModel {
    initialized: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        initialized: false
    }
})
export class AuthState {
    constructor(private authService: AuthService) { }
    /**
     * Login with Google Account
     *
     * @param {StateContext<AuthStateModel>} { dispatch }
     * @memberof AuthState
     */
    @Action(LoginAction)
    loginWithGoogle({ dispatch }: StateContext<AuthStateModel>) {
        dispatch(new ResetStateAction).pipe(first()).subscribe(_ => {
            this.authService.loginWithGoogle().pipe(
                first()
                , retry(3)
            ).subscribe((res: User) => {
                dispatch(new LoginSuccessfulEvent(res));
            }, err => {
                dispatch(new LoginFailedEvent(err));
            });
        })
    }
    /**
     * 
     * @param ctx Logout Action
     */
    @Action(LogoutAction)
    logout(ctx: StateContext<AuthStateModel>) {
        this.authService.logout().pipe(
            first()
            , retry(3)
        ).subscribe(() => {
            ctx.dispatch(new LogoutSuccessfulEvent);
        }, err => {
            ctx.dispatch(new LoggedOutFailedEvent(err));
        });
    }
}