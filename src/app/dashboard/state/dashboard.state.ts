import { Action, State, StateContext, Store } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { ResetAppStateAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { DashboardService } from '../services/dashboard.service';
import { ErrorLoadMemberBanksEvent, LoadUserOwnedBanksFailEvent, LoadMemberBanksAction, LoadUserOwnedBanksAction, SuccessLoadMemberBanksEvent, LoadUserOwnedBanksSuccessEvent } from './actions';

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
            ).subscribe(res => dispatch(new LoadUserOwnedBanksSuccessEvent(res))
                , err => dispatch(new LoadUserOwnedBanksFailEvent(err)));
        } else {
            dispatch(new LoadUserOwnedBanksSuccessEvent(this.store.selectSnapshot(AppState.myBanks)));
        }
    }
    /**
         * Load banks owned by others and logged in user is member
         *
         * @param {StateContext<DashboardStateModel>} { patchState, getState }
         * @param {LoadMemberBanksAction} { payload }
         * @memberof DashboardState
         */
    // @Action(LoadMemberBanksAction)
    // loadMemberBanks({ dispatch, getState }: StateContext<DashboardStateModel>, { payload }: LoadMemberBanksAction) {
    //     if (!this.store.selectSnapshot(AppState.otherBanks)) {
    //         this.bankService.getMyOtherBanks(payload.uid).pipe(
    //             first()
    //             , retry(3)
    //         ).subscribe(
    //             res => dispatch(new SuccessLoadMemberBanksEvent(res))
    //             , err => dispatch(new ErrorLoadMemberBanksEvent(err)));
    //     } else {
    //         dispatch(new SuccessLoadMemberBanksEvent(this.store.selectSnapshot(AppState.otherBanks)));
    //     }
    // }

}