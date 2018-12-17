import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { AddNewHistorySuccessEvent, SaveNewUserBankSuccessEvent, UpdateUserBankAction, UpdateUserBankSuccessEvent } from 'src/app/bank/state/actions';
import { LoadUserOwnedBanksSuccessEvent } from 'src/app/dashboard/state/actions';
import { History as History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { Feedback } from 'src/app/models/feedback';
import { Preferences } from 'src/app/models/preferences';
import { User } from 'src/app/models/user';
import { BankSelectionChangedEvent, RedirectToAction, RedirectToBankCreationAction, RedirectToBankDetailsAction, RedirectToDashboardAction, RedirectToFeedbackAction, RedirectToLoginAction, RedirectToPreferencesAction, ResetAppStateAction } from './actions';
import { LoadUserPreferencesSuccessfulEvent, LoggedOutFailedEvent, LoginFailedEvent, LoginSuccessfulEvent, LogoutSuccessfulEvent, SendUserFeedbackSuccessEvent, UpdateUserPreferencesSuccessEvent } from './events';
import { CheckTokenFailEvent } from 'src/app/invite/state/actions';

export class AppStateModel {
    initialized: boolean;
    error?: Error;
    user?: User;
    currentBank?: Bank;
    history?: History[];
    mybanks?: Bank[];
    otherBanks?: Bank[];
    preferences?: Preferences;
    feedbacks?: Feedback[];
    redirectPath?: URL;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        initialized: false
    }
})

export class AppState {

    constructor(private store: Store) { }

    @Selector()
    static error({ error }: AppStateModel) {
        return error;
    }
    @Selector()
    static currentUser({ user }: AppStateModel) {
        return user;
    }
    @Selector()
    static preferences({ preferences }: AppStateModel) {
        return preferences;
    }
    @Selector()
    static feedbacks({ feedbacks }: AppStateModel) {
        return feedbacks;
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
    @Selector()
    static redirectPath({ redirectPath }: AppStateModel) {
        return redirectPath;
    }


    /**
     * Reset complete App State
     */
    @Action(ResetAppStateAction)
    resetComponentState(ctx: StateContext<AppStateModel>) {
        ctx.patchState({
            user: undefined,
            currentBank: undefined,
            mybanks: [],
            otherBanks: [],
            preferences: undefined
        });
    }
    /**
     * Login Events
     */
    @Action(LoginSuccessfulEvent)
    loginWithGoogleSuccessful({ patchState }: StateContext<AppStateModel>, { payload }: LoginSuccessfulEvent) {
        patchState({ error: undefined, user: payload });
    }
    @Action(LoginFailedEvent)
    loginFailed({ patchState }: StateContext<AppStateModel>, { payload }: LoginFailedEvent) {
        patchState({
            error: payload
        });
    }
    /**
     * Logout Events
     */
    @Action(LogoutSuccessfulEvent)
    logoutSuccessful() {
        this.store.reset({});
    }
    @Action(LoggedOutFailedEvent)
    logoutFailed(ctx: StateContext<AppStateModel>, { payload }: LoggedOutFailedEvent) {
        ctx.patchState({
            error: payload
        });
    }
    /**
    * New Bank Created
    */
    @Action(SaveNewUserBankSuccessEvent)
    saveNewUserBankSuccess({ patchState }: StateContext<AppStateModel>, { payload }: SaveNewUserBankSuccessEvent) {
        patchState({
            currentBank: payload
        })
    }
    /**
    * Bank Updated
    */
    @Action(UpdateUserBankSuccessEvent)
    updateUserBankSuccess({ patchState }: StateContext<AppStateModel>, { payload }: UpdateUserBankSuccessEvent) {
        patchState({
            currentBank: payload
        })
    }
    /**
     * User related Banks loaded
     */
    @Action(LoadUserOwnedBanksSuccessEvent)
    LoadUserOwnedBanksSuccess({ patchState }: StateContext<AppStateModel>, { payload }: LoadUserOwnedBanksSuccessEvent) {
        patchState({
            mybanks: payload
        })
    }
    /**
     * 
     * Bank Selection changed
     */
    @Action(BankSelectionChangedEvent)
    bankSelectionChanged({ patchState }: StateContext<AppStateModel>, { payload }: BankSelectionChangedEvent) {
        patchState({
            currentBank: payload
        })
    }
    /**
     * Preferences loaded
     */
    @Action(LoadUserPreferencesSuccessfulEvent)
    loadUserPreferencesSuccessful({ patchState }: StateContext<AppStateModel>, { payload }: LoadUserPreferencesSuccessfulEvent) {
        patchState({
            preferences: payload.pop()
        })
    }
    @Action(UpdateUserPreferencesSuccessEvent)
    updateUserPreferencesSuccess({ patchState }: StateContext<AppStateModel>, { payload }: UpdateUserPreferencesSuccessEvent) {
        patchState({
            preferences: payload
        })
    }
    /**
     * Arrived Feedback
     */
    @Action(SendUserFeedbackSuccessEvent)
    sendUserFeedbackSuccess() {
        alert('Vielen Dank für dein Feedback!');
    }
    /**
     * Bank History changed
     */
    @Action(AddNewHistorySuccessEvent)
    addNewHistorySuccess({ getState, dispatch, patchState }: StateContext<AppStateModel>, { payload }: AddNewHistorySuccessEvent) {
        const currentBank = { ...getState().currentBank };
        currentBank.balance += payload.amount || 0;
        dispatch(new UpdateUserBankAction(currentBank)).pipe(first()).subscribe(_ => {
            patchState({
                currentBank: currentBank
            })
        });
    }
    /**
     * Invite Actions
     */
    @Action(CheckTokenFailEvent)
    tokenFailed({ patchState }: StateContext<AppStateModel>, { payload }: CheckTokenFailEvent) {
        patchState({
            error: payload
        })
    }
    /**
     * Navigation
     */
    @Action(RedirectToLoginAction)
    redirectToLogin({ dispatch, patchState }: StateContext<AppStateModel>, { payload }: RedirectToLoginAction) {
        patchState({ error: undefined, redirectPath: payload });
        dispatch(new Navigate(['/login']));
    }

    @Action(RedirectToPreferencesAction)
    redirectToPreferences({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/preferences']));
    }

    @Action(RedirectToFeedbackAction)
    redirectToFeedback({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/feedback']));
    }

    @Action(RedirectToDashboardAction)
    redirectToDashboard({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/dashboard']));
    }

    @Action(RedirectToBankDetailsAction)
    redirectToBankDetailsAction({ dispatch, getState, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/bank/details']));
    }

    @Action(RedirectToBankCreationAction)
    redirectToBankCreation({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/bank']));
    }

    @Action(RedirectToAction)
    redirectToDeposit({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/bank/history']));
    }

}