import { State, StateContext, Action, Selector } from '@ngxs/store';
import { ResetStateAction } from 'src/app/login/state/actions';
import { User } from 'src/app/models/user';
import { SetUserAction } from './actions';
import { GoogleLoggedInEvent, LoggedOutEvent } from 'src/app/login/state/events';

export class AppStateModel {
    user: User;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        user: null
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
            user: null
        });
    }

    @Action(SetUserAction)
    userChanged(ctx: StateContext<AppStateModel>, { payload }: SetUserAction) {
        ctx.patchState({ user: payload });
        ctx.dispatch(['/dashboard']);
    }

}