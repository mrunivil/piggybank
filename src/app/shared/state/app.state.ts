import { State, StateContext, Action, Selector } from '@ngxs/store';
import { ResetStateAction } from 'src/app/login/state/actions';
import { User } from 'src/app/models/user';
import { SetUserAction, RedirectToLoginAction } from './actions';
import { GoogleLoggedInEvent, LoggedOutEvent } from 'src/app/login/state/events';
import { Navigate } from '@ngxs/router-plugin';

export class AppStateModel {
    user: User;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        user: undefined
    }
})

export class AppState {

    @Selector()
    static currentUser({ user }: AppStateModel) {
        return user;
    }

    @Action(ResetStateAction)
    resetComponentState(ctx: StateContext<AppStateModel>) {
        ctx.patchState({
            user: undefined
        });
    }

    @Action(SetUserAction)
    userChanged(ctx: StateContext<AppStateModel>, { payload }: SetUserAction) {
        ctx.patchState({ user: payload });
        ctx.dispatch(new Navigate(['/dashboard']));
    }

    @Action(RedirectToLoginAction)
    redirectToLogin(ctx: StateContext<AppStateModel>) {
        ctx.dispatch(new Navigate(['/login']));
    }

}