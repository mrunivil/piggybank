import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../services/dashboard.service';
import { AttachBankAction, ErrorLoadUserOwnedBanksEvent, LoadUserOwnedBanksAction, ResetStateAction, SuccessLoadUserOwnedBanksEvent } from './actions';

export class DashboardStateModel {
    initialized: boolean;
    error: string;
    ownedBanks: Bank[];
    otherBanks: Bank[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        initialized: false,
        error: null,
        ownedBanks: undefined,
        otherBanks: undefined
    }
})
export class DashboardState {

    constructor(private bankService: DashboardService) { }

    @Selector()
    static errorMessage({ error }: DashboardStateModel) {
        return error;
    }

    @Selector()
    static myOwenedBanks({ ownedBanks }: DashboardStateModel) {
        return ownedBanks;
    }

    @Selector()
    static OtherBanks({ otherBanks }: DashboardStateModel) {
        return otherBanks;
    }

    @Action(ResetStateAction)
    reset({ patchState }: StateContext<DashboardStateModel>) {
        patchState({
            error: null
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
        if (!getState().initialized) {
            this.bankService.getMyOwenedBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe(res => dispatch(new SuccessLoadUserOwnedBanksEvent(res))
                , err => dispatch(new ErrorLoadUserOwnedBanksEvent(err)));
        }
    }
    @Action(SuccessLoadUserOwnedBanksEvent)
    successLoadUserOwenedBanksEvent({ patchState }: StateContext<DashboardStateModel>, { payload }: SuccessLoadUserOwnedBanksEvent) {
        patchState({
            error: undefined,
            initialized: true,
            ownedBanks: payload
        })
    }
    @Action(ErrorLoadUserOwnedBanksEvent)
    errorLoadUserOwenedBanksEvent({ patchState }: StateContext<DashboardStateModel>, { payload }: ErrorLoadUserOwnedBanksEvent) {
        patchState({
            error: payload
        })
    }

    @Action(AttachBankAction)
    attachBankAction(ctx: StateContext<DashboardStateModel>, { payload }: AttachBankAction) {
        const state = ctx.getState();
        ctx.patchState({
            ownedBanks: [...state.ownedBanks, payload]
        })
    }


}