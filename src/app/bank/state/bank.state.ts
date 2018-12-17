import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import { first, retry, tap } from 'rxjs/operators';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadBankHistoryFailEvent, LoadBankHistorySuccessEvent } from 'src/app/shared/state/events';
import { BankService } from '../services/bank.service';
import { AddNewHistoryAction, AddNewHistoryFailEvent, AddNewHistorySuccessEvent, LoadBankHistoryAction, ResetStateAction, SaveNewUserBankAction, ShareedYourBankFailEvent, ShareedYourBankSuccessfullEvent, ShareYourBankAction, ToggleHistoryDteailsAction, UpdateUserBankAction, UpdateUserBankFailEvent, UpdateUserBankSuccessEvent } from './actions';


export class BankStateModel {
    currentBank: Bank;
    history: History[];
    members: User[];
    onlyBalanceChanges: boolean;
}

@State<BankStateModel>({
    name: 'bank',
    defaults: {
        currentBank: {} as Bank,
        history: [],
        members: [],
        onlyBalanceChanges: true
    }
})
export class BankState {

    constructor(private bankService: BankService, private store: Store, private actions: Actions) { }

    @Selector()
    static currentBank({ currentBank }: BankStateModel) {
        return currentBank;
    }
    @Selector()
    static onlyBalanceChanges({ onlyBalanceChanges }: BankStateModel) {
        return onlyBalanceChanges;
    }
    @Selector()
    static history({ history }: BankStateModel) {
        return history;
    }
    @Selector()
    static members({ members }: BankStateModel) {
        return members;
    }

    @Action(ResetStateAction)
    resetStateAction({ patchState }: StateContext<BankStateModel>) {
        patchState({
            currentBank: {} as Bank,
            history: [],
            onlyBalanceChanges: true
        })
    }
    @Action(ToggleHistoryDteailsAction)
    toggleHistoryDteailsAction({ getState, patchState }: StateContext<BankStateModel>) {
        patchState({
            onlyBalanceChanges: !getState().onlyBalanceChanges
        })
    }
    @Action(SaveNewUserBankAction)
    saveNewUserBank({ patchState }: StateContext<BankStateModel>, { payload }: SaveNewUserBankAction) {
        return this.bankService.createNewBank(payload).pipe(first(), retry(3), tap(res => {
            patchState({
                currentBank: res
            })
        }));
    }
    @Action(UpdateUserBankAction)
    updateUserBank({ patchState, dispatch }: StateContext<BankStateModel>, { payload }: UpdateUserBankAction) {
        this.bankService.updateMyBank(payload).pipe(first(), retry(3), tap(res => {
            patchState({
                currentBank: res
            })
        })).subscribe(_ => {
            dispatch(new UpdateUserBankSuccessEvent(this.store.selectSnapshot(BankState.currentBank)))
        }, err => dispatch(new UpdateUserBankFailEvent(err)));
    }
    @Action(AddNewHistoryAction)
    addNewHostory({ dispatch, patchState, getState }: StateContext<BankStateModel>, { id, action }: AddNewHistoryAction) {
        this.bankService.addHistory(id, action).pipe(first(), retry(3), tap(res => {
            patchState({
                history: [...getState().history, res]
            })
        })).subscribe(
            res => dispatch(new AddNewHistorySuccessEvent(res))
            , err => dispatch(new AddNewHistoryFailEvent(err))
        )
    }
    @Action(LoadBankHistoryAction)
    LoadBankHistory({ patchState, dispatch }: StateContext<BankStateModel>, { payload }: LoadBankHistoryAction) {
        this.bankService.getHistory(payload).pipe(
            first()
            , retry(3)
            , tap(res => {
                patchState({
                    history: res
                })
            })
        ).subscribe(
            res => dispatch(new LoadBankHistorySuccessEvent(res))
            , err => dispatch(new LoadBankHistoryFailEvent(err))
        );
    }
    @Action(ShareYourBankAction)
    shareYourBank({ dispatch }: StateContext<BankStateModel>) {
        this.bankService.invite(new Token(
            this.store.selectSnapshot(AppState.currentBank).id,
            this.store.selectSnapshot(AppState.currentBank).name
        )).pipe(first(), retry(3)).subscribe(
            res => dispatch(new ShareedYourBankSuccessfullEvent(res))
            , err => dispatch(new ShareedYourBankFailEvent(err)));


    }
    /**
     * Load details for a selected bank
     *
     * @param {StateContext<BankStateModel>} { patchState, dispatch }
     * @param {LoadBankDetailsAction} { bankId }
     * @memberof BankState
     */
    // @Action(LoadBankDetailsAction)
    // loadBankDetails({ dispatch }: StateContext<BankStateModel>, { bankId }: LoadBankDetailsAction) {
    //     this.bankService.getBankDetails(bankId).pipe(
    //         first()
    //         , retry(3)
    //     ).subscribe(res => dispatch(new SuccessLoadBankDetailsEvent(res)),
    //         err => dispatch(new ErrorLoadBankDetailsEvent(err)));
    // }

    // @Action(LoadBankHistoryAction)
    // loadBankHistory({ dispatch }: StateContext<BankState>, { payload }: LoadBankHistoryAction) {
    //     this.bankService.getHistory(payload).pipe(first()).subscribe(res => {
    //         dispatch(new LoadBankHistorySuccessEvent(res));
    //     }, err => {
    //         dispatch(new LoadBankHistoryFailEvent(err));
    //     });
    // }
    /**
     * Save a new data set
     *
     * @param {StateContext<BankStateModel>} {  dispatch }
     * @param {SaveNewBankAction} { payload }
     * @memberof BankState
     */
    // @Action(SaveNewBankAction)
    // saveNewBankAction({ dispatch }: StateContext<BankStateModel>, { payload }: SaveNewBankAction) {
    //     this.bankService.createNewBank(payload).pipe(
    //         first()).subscribe(res => {
    //             dispatch(new SuccessSaveNewBankEvent(res))
    //         }, err => {
    //             dispatch(new ErrorSaveNewBankEvent(err));
    //         });
    // }
    // @Action(SuccessSaveNewBankEvent)
    // successSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: SuccessSaveNewBankEvent) {
    //     patchState({
    //         error: undefined,
    //     });
    // }
    // @Action(ErrorSaveNewBankEvent)
    // errorSaveNewBankEvent({ patchState }: StateContext<BankStateModel>, { payload }: ErrorSaveNewBankEvent) {
    //     patchState({
    //         error: payload
    //     })
    // }
    /**
     * Updating an existing Bank
     *
     * @param {StateContext<BankStateModel>} { dispatch }
     * @param {UpdateBankAction} { payload }
     * @memberof BankState
     */
    // @Action(UpdateBankAction)
    // updateBank({ dispatch }: StateContext<BankStateModel>, { payload }: UpdateBankAction) {
    //     const bank = {
    //         id: payload.id
    //         , balance: payload.balance
    //         , name: payload.name
    //         , owner: payload.owner
    //         , photoURL: payload.photoURL
    //         , paypal: payload.paypal
    //         , paypal_account: payload.paypal_account
    //     };
    //     this.bankService.updateMyBank(bank).pipe(first()).subscribe(res => {
    //         dispatch(new UpdateBankSuccessEvent(res));
    //     }, err => dispatch(new UpdateBankFailEvent(err)));
    // }
    // @Action(UpdateBankSuccessEvent)
    // updateBankSuccess({ patchState }: StateContext<BankStateModel>, { payload }: UpdateBankSuccessEvent) {
    //     patchState({
    //         // currentBank: payload
    //     })
    // }
    // @Action(UpdateBankFailEvent)
    // updateBankFail({ patchState }: StateContext<BankStateModel>, { payload }: UpdateBankFailEvent) {
    //     patchState({
    //         error: payload
    //     })
    // }
    /**
    * Reset state after logout
    *
    * @param {StateContext<AuthStateModel>} { dispatch }
    * @memberof AuthState
    */
    // @Action(ResetAppStateAction)
    // resetAll({ dispatch }: StateContext<BankStateModel>) {
    //     dispatch(new ResetStateAction);
    // }



    /**
    * Adding a new history entry
    *
    * @param {StateContext<BankStateModel>} { dispatch }
    * @param {AddNewHistoryAction} { id, action }
    * @memberof BankState
    */
    // @Action(AddNewHistoryAction)
    // addNewHistory({ getState, dispatch }: StateContext<BankStateModel>, { action }: AddNewHistoryAction) {
    //     this.bankService.addHistory(this.store.selectSnapshot(AppState.currentBank), action).pipe(
    //         first()
    //         , concat(
    //             dispatch(new AddNewHistoryActionSuccessEvent(action)),
    //         )
    //         , catchError(err => dispatch(new AddNewHistoryActionFailEvent(err)))
    //     ).subscribe();
    // }

    // @Action(AddNewOwnerAction)
    // addNewOwner({ dispatch, getState }: StateContext<BankStateModel>) {
    //     this.bankService.setOwner(this.store.selectSnapshot(AppState.currentBank), this.store.selectSnapshot(AppState.currentUser))
    //         .pipe(
    //             first()
    //         ).subscribe(_ => dispatch(new AddNewOwnerActionSuccessEvent),
    //             err => dispatch(new AddNewOwnerActionFailEvent(err)));
    // }

}