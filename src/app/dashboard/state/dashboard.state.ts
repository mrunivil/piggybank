import { Action, State, StateContext, Store } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { ResetAppStateAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { DashboardService } from '../services/dashboard.service';
import { LoadMemberBanksFailEvent, LoadUserOwnedBanksFailEvent, LoadMemberBanksAction, LoadUserOwnedBanksAction, LoadMemberBanksSuccessEvent, LoadUserOwnedBanksSuccessEvent } from './actions';

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
    loadUserOwnedBanks({ dispatch, getState }: StateContext<DashboardStateModel>, { payload, force }: LoadUserOwnedBanksAction) {
        this.bankService.getMyOwenedBanks(payload.uid).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new LoadUserOwnedBanksSuccessEvent(res))
            , err => dispatch(new LoadUserOwnedBanksFailEvent(err)));
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
        this.bankService.getMyOtherBanks(payload.uid).pipe(
            first()
            , retry(3)
        ).subscribe(
            res => dispatch(new LoadMemberBanksSuccessEvent(res))
            , err => dispatch(new LoadMemberBanksFailEvent(err)));
    }

}