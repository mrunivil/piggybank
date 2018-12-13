import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../services/dashboard.service';
import { AttachBankAction, ErrorLoadUserOwnedBanksEvent, LoadUserOwnedBanksAction, ResetStateAction, SuccessLoadUserOwnedBanksEvent, LoadMemberBanksAction, SuccessLoadMemberBanksEvent, ErrorLoadMemberBanksEvent } from './actions';
import { ResetAppStateAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';

export class DashboardStateModel {
    initialized: boolean;
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        initialized: false,
    }
})
export class DashboardState {

    constructor(private bankService: DashboardService, private store: Store) { }

    @Action(ResetStateAction)
    reset({ patchState }: StateContext<DashboardStateModel>) {
        patchState({
            initialized: false
        });
    }

    /**
     * Load banks owned by the user
     *
     * @param {StateContext<DashboardStateModel>} { patchState, getState }
     * @param {LoadUserOwnedBanksAction} { payload }
     * @memberof DashboardState
     */
    @Action(LoadUserOwnedBanksAction)
    loadUserOwnedBanks({ dispatch, getState }: StateContext<DashboardStateModel>, { payload }: LoadUserOwnedBanksAction) {
        if (!this.store.selectSnapshot(AppState.myBanks)) {
            this.bankService.getMyOwenedBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe(res => dispatch(new SuccessLoadUserOwnedBanksEvent(res))
                , err => dispatch(new ErrorLoadUserOwnedBanksEvent(err)));
        } else {
            dispatch(new SuccessLoadUserOwnedBanksEvent(this.store.selectSnapshot(AppState.myBanks)));
        }
    }
    /**
         * Load banks owned by others and logged in user is member
         *
         * @param {StateContext<DashboardStateModel>} { patchState, getState }
         * @param {LoadMemberBanksAction} { payload }
         * @memberof DashboardState
         */
    @Action(LoadMemberBanksAction)
    loadMemberBanks({ dispatch, getState }: StateContext<DashboardStateModel>, { payload }: LoadMemberBanksAction) {
        if (!this.store.selectSnapshot(AppState.otherBanks)) {
            this.bankService.getMyOtherBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe(
                res => dispatch(new SuccessLoadMemberBanksEvent(res))
                , err => dispatch(new ErrorLoadMemberBanksEvent(err)));
        } else {
            dispatch(new SuccessLoadMemberBanksEvent(this.store.selectSnapshot(AppState.otherBanks)));
        }
    }

    /**
         * Reset state after logout
         *
         * @param {StateContext<AuthStateModel>} { dispatch }
         * @memberof AuthState
         */
    @Action(ResetAppStateAction)
    resetAll({ dispatch }: StateContext<DashboardStateModel>) {
        dispatch(new ResetStateAction);
    }

}