import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ResetStateAction } from './actions';
import { BankService } from '../services/bank';
export class AuthStateModel {
    error: string;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        error: null
    }
})
export class AuthState {

    constructor(private bankService: BankService) { }

    @Selector()
    static errorMessage({ error }: AuthStateModel) {
        return error;
    }

    @Action(ResetStateAction)
    reset(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            error: null
        });
    }



}