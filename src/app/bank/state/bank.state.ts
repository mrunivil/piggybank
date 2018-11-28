import { BankService } from '../services/bank.service';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { Bank } from 'src/app/models/bank';
import { LoadBankDetailsAction } from './actions';
import { tap, take } from 'rxjs/operators';


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
}