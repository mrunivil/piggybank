import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, tap } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../services/dashboard.service';
import { LoadUserOwenedBanksAction, ResetStateAction } from './actions';

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

    constructor(private bankService: BankService) { }

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
    loadUserOwenedBanks({ patchState }: StateContext<DashboardStateModel>) {
        this.bankService.getMyOwenedBanks().pipe(
            first()
            , tap(res => {
                patchState({
                    owenedBanks: res
                })
            })
        ).subscribe();
    }



}