import { User } from 'src/app/models/user';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { GoogleLoginAction, LogoutAction, ResetStateAction } from './actions';
import { LoginFailedEvent, GoogleLoggedInEvent, LoggedOutEvent, LoggedOutFailedEvent } from './events';
import { AuthService } from '../services/auth';
import { take, first, switchMap, concatAll, concat, retry, catchError } from 'rxjs/operators'
import { SetUserAction } from 'src/app/shared/state/actions';
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

    constructor(private authService: AuthService) { }

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
     * 
     * @param ctx Login Action
     */
    @Action(GoogleLoginAction)
    loginWithGoogle(ctx: StateContext<AuthStateModel>) {
        ctx.dispatch(new ResetStateAction).pipe(
            switchMap(() => this.authService.loginWithGoogle())
            , first()
            , retry(3)
        ).subscribe((res: User) => {
            ctx.dispatch(new GoogleLoggedInEvent(res));
        }, err => {
            ctx.dispatch(new LoginFailedEvent(err));
        });
    }

    @Action(GoogleLoggedInEvent)
    loginWithGoogleSuccessful(ctx: StateContext<AuthStateModel>, { payload }: GoogleLoggedInEvent) {
        ctx.dispatch(new ResetStateAction).pipe(first()).subscribe(() => ctx.dispatch(new SetUserAction(payload)).pipe(first()).subscribe());
    }

    @Action(LoginFailedEvent)
    loginFailed(ctx: StateContext<AuthStateModel>, { payload }: LoginFailedEvent) {
        ctx.patchState({
            error: payload
        });
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
        ctx.dispatch([new SetUserAction(null), new ResetStateAction,]);
    }

    @Action(LoggedOutFailedEvent)
    logoutFailed(ctx: StateContext<AuthStateModel>, { payload }: LoggedOutFailedEvent) {
        ctx.patchState({
            error: payload
        });
    }

}