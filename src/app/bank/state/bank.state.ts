import { Action, Actions, ofActionSuccessful, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, concat, first, retry } from 'rxjs/operators';
import { CreateBankHistoryAction } from 'src/app/models/actions/create-bank';
import { SetOwnerHistoryAction } from 'src/app/models/actions/set-owner';
import { Bank } from 'src/app/models/bank';
import { ResetAppStateAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { BankService } from '../services/bank.service';
import { AddNewHistoryAction, AddNewHistoryActionFailEvent, AddNewHistoryActionSuccessEvent, AddNewOwnerAction, AddNewOwnerActionFailEvent, AddNewOwnerActionSuccessEvent, ErrorLoadBankDetailsEvent, ErrorSaveNewBankEvent, LoadBankDetailsAction, ResetStateAction, SaveNewBankAction, SuccessLoadBankDetailsEvent, SuccessSaveNewBankEvent, ToggleHistoryDteailsAction, UpdateBankAction, UpdateBankFailEvent, UpdateBankSuccessEvent } from './actions';


export class BankStateModel {
    error: string;
    newBank: Bank;
    onlyBalanceChanges: boolean;
}

@State<BankStateModel>({
    name: 'bank',
    defaults: {
        error: null,
        newBank: {} as Bank,
        onlyBalanceChanges: true
    }
})
export class BankState {

    constructor(private bankService: BankService, private store: Store, private actions: Actions) { }

    @Selector()
    static error({ error }: BankStateModel) {
        return error;
    }
    @Selector()
    static newBank({ newBank }: BankStateModel) {
        return newBank;
    }
    @Selector()
    static onlyBalanceChanges({ onlyBalanceChanges }: BankStateModel) {
        return onlyBalanceChanges;
    }


    @Action(ResetStateAction)
    resetStateAction({ patchState }: StateContext<BankStateModel>) {
        patchState({
            error: null,
            newBank: {} as Bank,
            onlyBalanceChanges: true
        })
    }

    /**
     * Load details for a selected bank
     *
     * @param {StateContext<BankStateModel>} { patchState, dispatch }
     * @param {LoadBankDetailsAction} { bankId }
     * @memberof BankState
     */
    @Action(LoadBankDetailsAction)
    loadBankDetails({ dispatch }: StateContext<BankStateModel>, { bankId }: LoadBankDetailsAction) {
        this.bankService.getBankDetails(bankId).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new SuccessLoadBankDetailsEvent(res)),
            err => dispatch(new ErrorLoadBankDetailsEvent(err)));
    }


    /**
     * Save a new data set
     *
     * @param {StateContext<BankStateModel>} {  dispatch }
     * @param {SaveNewBankAction} { payload }
     * @memberof BankState
     */
    @Action(SaveNewBankAction)
    saveNewBankAction({ dispatch }: StateContext<BankStateModel>, { payload }: SaveNewBankAction) {
        this.bankService.createNewBank(payload).pipe(
            first()).subscribe(res => {
                concat(
                    dispatch(new SuccessSaveNewBankEvent(res)),
                    dispatch(new AddNewHistoryAction(payload.id, new CreateBankHistoryAction(this.store.selectSnapshot(AppState.currentUser)))),
                    ofActionSuccessful(),
                    dispatch(new AddNewOwnerAction),
                    dispatch(new AddNewHistoryAction(payload.id, new SetOwnerHistoryAction(this.store.selectSnapshot(AppState.currentUser)))));
            }, err => {
                dispatch(new ErrorSaveNewBankEvent(err));
            });
    }
    @Action(SuccessSaveNewBankEvent)
    successSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: SuccessSaveNewBankEvent) {
        patchState({
            error: undefined,
        });
    }
    @Action(ErrorSaveNewBankEvent)
    errorSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: ErrorSaveNewBankEvent) {
        patchState({
            error: payload
        })
    }
    /**
     * Updating an existing Bank
     *
     * @param {StateContext<BankStateModel>} { dispatch }
     * @param {UpdateBankAction} { payload }
     * @memberof BankState
     */
    @Action(UpdateBankAction)
    updateBank({ dispatch }: StateContext<BankStateModel>, { payload }: UpdateBankAction) {
        this.bankService.updateMyBank(payload).pipe(first()).subscribe(res => {
            dispatch(new UpdateBankSuccessEvent(res));
        }, err => dispatch(new UpdateBankFailEvent(err)));
    }
    @Action(UpdateBankSuccessEvent)
    updateBankSuccess({ patchState }: StateContext<BankStateModel>, { payload }: UpdateBankSuccessEvent) {
        patchState({
            // currentBank: payload
        })
    }
    @Action(UpdateBankFailEvent)
    updateBankFail({ patchState }: StateContext<BankStateModel>, { payload }: UpdateBankFailEvent) {
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

    @Action(ToggleHistoryDteailsAction)
    toggleHistoryDteailsAction({ getState, patchState }: StateContext<BankStateModel>) {
        patchState({
            onlyBalanceChanges: !getState().onlyBalanceChanges
        })
    }

    /**
    * Adding a new history entry
    *
    * @param {StateContext<BankStateModel>} { dispatch }
    * @param {AddNewHistoryAction} { id, action }
    * @memberof BankState
    */
    @Action(AddNewHistoryAction)
    addNewHistory({ getState, dispatch }: StateContext<BankStateModel>, { action }: AddNewHistoryAction) {
        this.bankService.addHistory(this.store.selectSnapshot(AppState.currentBank), action).pipe(
            first()
            , concat(
                dispatch(new AddNewHistoryActionSuccessEvent(action)),
                dispatch(new UpdateBankAction(this.store.selectSnapshot(AppState.currentBank)))
            )
            , catchError(err => dispatch(new AddNewHistoryActionFailEvent(err)))
        )
    }


    @Action(AddNewOwnerAction)
    addNewOwner({ dispatch, getState }: StateContext<BankStateModel>) {
        this.bankService.setOwner(this.store.selectSnapshot(AppState.currentBank), this.store.selectSnapshot(AppState.currentUser))
            .pipe(
                first()
            ).subscribe(_ => dispatch(new AddNewOwnerActionSuccessEvent),
                err => dispatch(new AddNewOwnerActionFailEvent(err)));
    }

}