import { BankService } from '../services/bank.service';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { Bank } from 'src/app/models/bank';
import { LoadBankDetailsAction, SaveNewBankAction, ResetStateAction, SuccessLoadBankDetailsEvent, ErrorLoadBankDetailsEvent, SuccessSaveNewBankEvent, ErrorSaveNewBankEvent } from './actions';
import { tap, take, catchError, flatMap, first, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { AttachBankAction } from 'src/app/dashboard/state/actions';
import { ResetAppStateAction } from 'src/app/shared/state/actions';


export class BankStateModel {
    error: string;
    currentBank: Bank;
    newBank: Bank;
    success?: boolean;
}

@State<BankStateModel>({
    name: 'bank',
    defaults: {
        error: null,
        currentBank: undefined,
        newBank: {} as Bank,
    }
})
export class BankState {

    constructor(private bankService: BankService) { }

    @Selector()
    static error({ error }: BankStateModel) {
        return error;
    }
    @Selector()
    static success({ success }: BankStateModel) {
        return success;
    }
    @Selector()
    static currentBank({ currentBank }: BankStateModel) {
        return currentBank;
    }
    @Selector()
    static newBank({ newBank }: BankStateModel) {
        return newBank;
    }

    @Action(ResetStateAction)
    resetStateAction({ patchState }: StateContext<BankStateModel>) {
        patchState({
            error: null,
            currentBank: undefined,
            newBank: {} as Bank,
            success: undefined
        })
    }

    /**
     * Load details for a selected bank
     *
     * @param {StateContext<BankStateModel>} { patchState, dispatch }
     * @param {LoadBankDetailsAction} { bankId, userId }
     * @memberof BankState
     */
    @Action(LoadBankDetailsAction)
    loadBankDetails({ patchState, dispatch }: StateContext<BankStateModel>, { bankId, userId }: LoadBankDetailsAction) {
        this.bankService.getBankDetails(bankId, userId).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new SuccessLoadBankDetailsEvent(res)),
            err => dispatch(new ErrorLoadBankDetailsEvent(err)));
    }
    @Action(SuccessLoadBankDetailsEvent)
    successLoadBankDetailsEvent({ patchState }: StateContext<BankStateModel>, { payload }: SuccessLoadBankDetailsEvent) {
        patchState({
            error: undefined,
            currentBank: payload
        })
    }
    @Action(ErrorLoadBankDetailsEvent)
    errorLoadBankDetailsEvent({ patchState }: StateContext<BankStateModel>, { payload }: ErrorLoadBankDetailsEvent) {
        patchState({
            error: payload
        })
    }


    @Action(SaveNewBankAction)
    saveNewBankAction({ patchState, dispatch }: StateContext<BankStateModel>, { payload }: SaveNewBankAction) {
        this.bankService.createNewBank(payload).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new SuccessSaveNewBankEvent(res)),
            err => dispatch(new ErrorSaveNewBankEvent(err)));
    }
    @Action(SuccessSaveNewBankEvent)
    successSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: SuccessSaveNewBankEvent) {
        patchState({
            error: undefined,
            success: true,
            currentBank: payload
        })
    }
    @Action(ErrorSaveNewBankEvent)
    errorSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: ErrorSaveNewBankEvent) {
        patchState({
            error: payload
        })
    }
    /**
         * Reset state after logout
         *
         * @param {StateContext<AuthStateModel>} { dispatch }
         * @memberof AuthState
         */
    @Action(ResetAppStateAction)
    resetAll({ dispatch }: StateContext<BankStateModel>) {
        dispatch(new ResetStateAction);
    }
}