import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { first, tap, catchError, retry } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../services/dashboard.service';
import { LoadUserOwenedBanksAction, ResetStateAction, AttachBankAction } from './actions';

export class DashboardStateModel {
    initialized: boolean;
    error: string;
    owenedBanks: Bank[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        initialized: false,
        error: null,
        owenedBanks: undefined
    }
})
export class DashboardState {

    constructor(private bankService: DashboardService) { }

    @Selector()
    static errorMessage({ error }: DashboardStateModel) {
        return error;
    }

    @Selector()
    static myOwenedBanks({ owenedBanks }: DashboardStateModel) {
        return owenedBanks;
    }

    @Action(ResetStateAction)
    reset({ patchState }: StateContext<DashboardStateModel>) {
        patchState({
            error: null
        });
    }

    @Action(LoadUserOwenedBanksAction)
    loadUserOwenedBanks({ patchState, getState }: StateContext<DashboardStateModel>, { payload }: LoadUserOwenedBanksAction) {
        if (!getState().initialized) {
            this.bankService.getMyOwenedBanks(payload.uid).pipe(
                first()
                , retry(3)
            ).subscribe((res) => {
                patchState({
                    owenedBanks: res,
                    initialized: true
                })
            }, (e) => { patchState({ error: e }); });
        }
    }

    @Action(AttachBankAction)
    attachBankAction(ctx: StateContext<DashboardStateModel>, { payload }: AttachBankAction) {
        const state = ctx.getState();
        ctx.patchState({
            owenedBanks: [...state.owenedBanks, payload]
        })
    }


}