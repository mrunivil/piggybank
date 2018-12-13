import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddNewHistoryActionFailEvent, AddNewHistoryActionSuccessEvent, AddNewOwnerActionFailEvent, AddNewOwnerActionSuccessEvent, ErrorLoadBankDetailsEvent, SuccessLoadBankDetailsEvent } from 'src/app/bank/state/actions';
import { BankStateModel } from 'src/app/bank/state/bank.state';
import { ErrorLoadUserOwnedBanksEvent, SuccessLoadUserOwnedBanksEvent, SuccessLoadMemberBanksEvent, ErrorLoadMemberBanksEvent } from 'src/app/dashboard/state/actions';
import { GoogleLoggedInEvent as LoginSuccessfulEvent, LoginFailedEvent } from 'src/app/login/state/actions';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToAction, RedirectToBankCreationAction, RedirectToBankDetailsAction, RedirectToDashboardAction, RedirectToFeedbackAction, RedirectToLoginAction, RedirectToPreferencesAction, ResetAppStateAction, SetSelectedBank as BankSelectionChangedEvent } from './actions';
import { DashboardStateModel } from 'src/app/dashboard/state/dashboard.state';

export class AppStateModel {
    initialized: boolean;
    error?: Error;
    user?: User;
    currentBank?: Bank;
    mybanks?: Bank[];
    otherBanks?: Bank[];
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        initialized: false
    }
})

export class AppState {

    @Selector()
    static currentUser({ user }: AppStateModel) {
        return user;
    }
    @Selector()
    static currentBank({ currentBank }: AppStateModel) {
        return currentBank;
    }
    @Selector()
    static myBanks({ mybanks }: AppStateModel) {
        return mybanks;
    }
    @Selector()
    static otherBanks({ otherBanks }: AppStateModel) {
        return otherBanks;
    }



    @Action(ResetAppStateAction)
    resetComponentState(ctx: StateContext<AppStateModel>) {
        ctx.patchState({
            user: undefined,
            currentBank: undefined,
            mybanks: undefined,
            otherBanks: undefined
        });
    }

    // Login Events
    @Action(LoginSuccessfulEvent)
    loginWithGoogleSuccessful({ patchState, dispatch }: StateContext<AppStateModel>, { payload }: LoginSuccessfulEvent) {
        patchState({ user: payload });
        dispatch(new RedirectToDashboardAction);
    }
    @Action(LoginFailedEvent)
    loginFailed({ patchState }: StateContext<AppStateModel>, { payload }: LoginFailedEvent) {
        patchState({
            error: payload
        });
    }


    // Selected Bank changed
    @Action(BankSelectionChangedEvent)
    bankSelectionChanged({ patchState, getState }: StateContext<AppStateModel>, { payload }: BankSelectionChangedEvent) {
        patchState({
            currentBank: { ...getState().currentBank, ...payload }
        })
    }
    // Bank Details loaded
    @Action(SuccessLoadBankDetailsEvent)
    successLoadBankDetailsEvent({ patchState, getState }: StateContext<AppStateModel>, { payload }: SuccessLoadBankDetailsEvent) {
        const bank: Bank = payload.length === 1 ? payload.pop() : undefined
        patchState({
            error: undefined,
            currentBank: { ...getState().currentBank, ...bank }
        })
    }
    @Action(ErrorLoadBankDetailsEvent)
    errorLoadBankDetailsEvent({ patchState }: StateContext<AppStateModel>, { payload }: ErrorLoadBankDetailsEvent) {
        patchState({
            error: payload
        })
    }
    // changed bank history
    @Action(AddNewHistoryActionSuccessEvent)
    addNewHistorySuccess({ patchState, getState, setState }: StateContext<AppStateModel>, { payload }: AddNewHistoryActionSuccessEvent) {
        const currentBank = { ...getState().currentBank };
        currentBank.history.push(payload);
        setState({ ...getState(), currentBank: currentBank });
    }
    @Action(AddNewHistoryActionFailEvent)
    addNewHistoryFail({ patchState }: StateContext<AppStateModel>, { payload }: AddNewHistoryActionFailEvent) {
        patchState({
            error: payload
        });
    }
    // mybanks changed
    @Action(SuccessLoadUserOwnedBanksEvent)
    successLoadUserOwenedBanks({ patchState }: StateContext<AppStateModel>, { payload }: SuccessLoadUserOwnedBanksEvent) {
        patchState({
            error: undefined,
            initialized: true,
            mybanks: payload
        })
    }
    @Action(ErrorLoadUserOwnedBanksEvent)
    errorLoadUserOwenedBanks({ patchState }: StateContext<AppStateModel>, { payload }: ErrorLoadUserOwnedBanksEvent) {
        patchState({
            error: payload
        })
    }
    // others banks changed
    @Action(SuccessLoadMemberBanksEvent)
    successLoadMemberBanks({ patchState }: StateContext<AppStateModel>, { payload }: SuccessLoadMemberBanksEvent) {
        patchState({
            initialized: true,
            otherBanks: payload
        })
    }
    @Action(ErrorLoadMemberBanksEvent)
    errorLoadMemberBanks({ patchState }: StateContext<AppStateModel>, { payload }: ErrorLoadMemberBanksEvent) {
        patchState({
            error: payload
        })
    }
    //error occured

    // Owner changed
    @Action(AddNewOwnerActionSuccessEvent)
    addNewOwnerSuccessful({ getState, patchState }: StateContext<AppStateModel>) {
        const currentBank = { ...getState().currentBank, owner: { ...getState().user } };
        patchState({ currentBank: currentBank });
    }

    @Action(AddNewOwnerActionFailEvent)
    addNewOwnerActionFailed({ patchState }: StateContext<BankStateModel>, { payload }: AddNewOwnerActionFailEvent) {
        patchState({
            error: payload
        })
    }

    @Action(RedirectToLoginAction)
    redirectToLogin(ctx: StateContext<AppStateModel>) {
        ctx.dispatch(new Navigate(['/login']));
    }

    @Action(RedirectToPreferencesAction)
    redirectToPreferences(ctx: StateContext<AppStateModel>) {
        ctx.dispatch(new Navigate(['/preferences']));
    }

    @Action(RedirectToFeedbackAction)
    redirectToFeedback(ctx: StateContext<AppStateModel>) {
        ctx.dispatch(new Navigate(['/feedback']));
    }

    @Action(RedirectToDashboardAction)
    redirectToDashboard(ctx: StateContext<AppStateModel>) {
        ctx.dispatch(new Navigate(['/dashboard']));
    }

    @Action(RedirectToBankDetailsAction)
    redirectToBankDetailsAction({ dispatch, getState }: StateContext<AppStateModel>) {
        dispatch(new Navigate(['/bank', getState().currentBank.id]));
    }

    @Action(RedirectToBankCreationAction)
    redirectToBankCreation({ dispatch }: StateContext<AppStateModel>) {
        dispatch(new Navigate(['/bank']));
    }

    @Action(RedirectToAction)
    redirectToDeposit({ dispatch }: StateContext<AppStateModel>) {
        dispatch(new Navigate(['/action']));
    }

}