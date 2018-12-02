import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../services/dashboard.service';
import { AttachBankAction, ErrorLoadUserOwnedBanksEvent, LoadUserOwnedBanksAction, ResetStateAction, SuccessLoadUserOwnedBanksEvent, LoadMemberBanksAction, SuccessLoadMemberBanksEvent, ErrorLoadMemberBanksEvent } from './actions';

export class DashboardStateModel {
    initialized: boolean;
    error: string;
    MY_BANKS: Bank[];
    OTHERS_BANKS: Bank[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        initialized: false,
        error: null,
        MY_BANKS: undefined,
        OTHERS_BANKS: undefined
    }
})
export class DashboardState {

    constructor(private bankService: DashboardService) { }

    @Selector()
    static errorMessage({ error }: DashboardStateModel) {
        return error;
    }

    @Selector()
    static MY_BANKS({ MY_BANKS }: DashboardStateModel) {
        return MY_BANKS;
    }

    @Selector()
    static OTHERS_BANKS({ OTHERS_BANKS }: DashboardStateModel) {
        return OTHERS_BANKS;
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
        if (!getState().MY_BANKS) {
            this.bankService.getMyOwenedBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe(res => dispatch(new SuccessLoadUserOwnedBanksEvent(res))
                , err => dispatch(new ErrorLoadUserOwnedBanksEvent(err)));
        }
    }
    @Action(SuccessLoadUserOwnedBanksEvent)
    successLoadUserOwenedBanks({ patchState }: StateContext<DashboardStateModel>, { payload }: SuccessLoadUserOwnedBanksEvent) {
        patchState({
            error: undefined,
            initialized: true,
            MY_BANKS: payload
        })
    }
    @Action(ErrorLoadUserOwnedBanksEvent)
    errorLoadUserOwenedBanks({ patchState }: StateContext<DashboardStateModel>, { payload }: ErrorLoadUserOwnedBanksEvent) {
        patchState({
            error: payload
        })
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
        if (!getState().OTHERS_BANKS) {
            this.bankService.getMyOtherBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe(
                res => dispatch(new SuccessLoadMemberBanksEvent(res))
                , err => dispatch(new ErrorLoadMemberBanksEvent(err)));
        }
    }
    @Action(SuccessLoadMemberBanksEvent)
    successLoadMemberBanks({ patchState }: StateContext<DashboardStateModel>, { payload }: SuccessLoadMemberBanksEvent) {
        patchState({
            error: undefined,
            initialized: true,
            OTHERS_BANKS: payload
        })
    }
    @Action(ErrorLoadMemberBanksEvent)
    errorLoadMemberBanks({ patchState }: StateContext<DashboardStateModel>, { payload }: ErrorLoadMemberBanksEvent) {
        patchState({
            error: payload
        })
    }

    @Action(AttachBankAction)
    attachBankAction(ctx: StateContext<DashboardStateModel>, { payload }: AttachBankAction) {
        const state = ctx.getState();
        ctx.patchState({
            MY_BANKS: [...state.MY_BANKS, payload]
        })
    }


}