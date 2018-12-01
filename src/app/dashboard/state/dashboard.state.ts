import { Action, Selector, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { first, tap } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../services/dashboard.service';
import { LoadUserOwenedBanksAction, ResetStateAction, AttachBankAction } from './actions';

export class DashboardStateModel {
    error: string;
    owenedBanks: Bank[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
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
    loadUserOwenedBanks({ patchState }: StateContext<DashboardStateModel>, { payload }: LoadUserOwenedBanksAction) {
        this.bankService.getMyOwenedBanks(payload.uid).pipe(
            first()
            , tap(res => {
                patchState({
                    owenedBanks: res
                })
            })
        ).subscribe();
    }

    @Action(AttachBankAction)
    attachBankAction(ctx: StateContext<DashboardStateModel>, { payload }: AttachBankAction) {
        const state = ctx.getState();
        ctx.patchState({
            owenedBanks: [...state.owenedBanks, payload]
        })
    }


}