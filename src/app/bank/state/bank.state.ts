import { BankService } from '../services/bank.service';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { Bank } from 'src/app/models/bank';
import { LoadBankDetailsAction, SaveNewBankAction } from './actions';
import { tap, take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AttachBankAction } from 'src/app/dashboard/state/actions';


export class BankStateModel {
    error: string;
    currentBank: Bank;
}

@State<BankStateModel>({
    name: 'bank',
    defaults: {
        error: null,
        currentBank: undefined
    }
})
export class BankState {

    constructor(private bankService: BankService) { }

    @Selector()
    static errorMessage({ error }: BankStateModel) {
        return error;
    }

    @Selector()
    static currentBank({ currentBank }: BankStateModel) {
        return currentBank;
    }

    @Action(LoadBankDetailsAction)
    loadBankDetails({ patchState }: StateContext<BankStateModel>, { bankId, userId }: LoadBankDetailsAction) {
        this.bankService.getBankDetails(bankId, userId).pipe(
            take(1)
            , tap(res => {
                patchState({
                    currentBank: res
                })
            })
        ).subscribe();
    }

    @Action(SaveNewBankAction)
    saveNewBankAction({ patchState, dispatch }: StateContext<BankStateModel>, { payload }: SaveNewBankAction) {
        return this.bankService.createNewBank(payload).pipe(
            take(1)
            , tap((ret) => {
                dispatch(new AttachBankAction(ret));
            })
            , catchError((e) => {
                console.error(`Error while saving new Bank:${e}`);
                throw e;
            })
        );
    }
}