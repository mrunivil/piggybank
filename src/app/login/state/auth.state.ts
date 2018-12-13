import { Action, Selector, State, StateContext, Actions, ofActionSuccessful } from '@ngxs/store';
import { first, retry, switchMap, concat, switchAll, last } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { SetUserAction, ResetAppStateAction } from 'src/app/shared/state/actions';
import { AuthService } from '../services/auth';
import { GoogleLoginAction, LogoutAction, ResetStateAction } from './actions';
import { GoogleLoggedInEvent, LoggedOutEvent, LoggedOutFailedEvent, LoginFailedEvent } from './actions';
export class AuthStateModel {
    error: string;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        error: null
    }
})
export class AuthState {

    constructor(private authService: AuthService, private actions: Actions) { }

    @Selector()
    static errorMessage({ error }: AuthStateModel) {
        return error;
    }

    @Action(ResetStateAction)
    reset(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            error: null
        });
    }

    /**
     * Login with Google Account
     *
     * @param {StateContext<AuthStateModel>} { dispatch }
     * @memberof AuthState
     */
    @Action(GoogleLoginAction)
    loginWithGoogle({ dispatch }: StateContext<AuthStateModel>) {
        dispatch(new ResetStateAction).pipe(first()).subscribe(_ => {
            this.authService.loginWithGoogle().pipe(
                first()
                , retry(3)
            ).subscribe((res: User) => {
                dispatch(new GoogleLoggedInEvent(res));
            }, err => {
                dispatch(err);
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
            ctx.dispatch(new LoggedOutEvent);
        }, err => {
            ctx.dispatch(new LoggedOutFailedEvent(err));
        });
    }
    @Action(LoggedOutEvent)
    logoutSuccessful(ctx: StateContext<AuthStateModel>) {
        ctx.dispatch(new ResetAppStateAction);
    }
    @Action(LoggedOutFailedEvent)
    logoutFailed(ctx: StateContext<AuthStateModel>, { payload }: LoggedOutFailedEvent) {
        ctx.patchState({
            error: payload
        });
    }

    /**
     * Reset state after logout
     *
     * @param {StateContext<AuthStateModel>} { dispatch }
     * @memberof AuthState
     */
    @Action(ResetAppStateAction)
    resetAll({ dispatch }: StateContext<AuthStateModel>) {
        dispatch(new ResetStateAction);
    }
}