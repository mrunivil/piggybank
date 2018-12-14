import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AddNewHistoryActionFailEvent, AddNewHistoryActionSuccessEvent, AddNewOwnerActionFailEvent, AddNewOwnerActionSuccessEvent, ErrorLoadBankDetailsEvent, SuccessLoadBankDetailsEvent, SuccessSaveNewBankEvent } from 'src/app/bank/state/actions';
import { BankStateModel } from 'src/app/bank/state/bank.state';
import { ErrorLoadMemberBanksEvent, ErrorLoadUserOwnedBanksEvent, SuccessLoadMemberBanksEvent, SuccessLoadUserOwnedBanksEvent, AttachBankAction } from 'src/app/dashboard/state/actions';
import { Bank } from 'src/app/models/bank';
import { Preferences } from 'src/app/models/preferences';
import { User } from 'src/app/models/user';
import { BankSelectionChangedEvent, RedirectToAction, RedirectToBankCreationAction, RedirectToBankDetailsAction, RedirectToDashboardAction, RedirectToFeedbackAction, RedirectToLoginAction, RedirectToPreferencesAction, ResetAppStateAction } from './actions';
import { LoginSuccessfulEvent, LoginFailedEvent, LogoutSuccessfulEvent, LoggedOutFailedEvent, LoadUserPreferencesSuccessfulEvent, LoadUserPreferencesFailEvent, UpdateUserPreferencesSuccessEvent, UpdateUserPreferencesFailEvent, SendUserFeedbackSuccessEvent, SendUserFeedbackFailEvent, LoadUserFeedbackSuccessfulEvent, LoadUserFeedbackFailEvent, LoadBankHistorySuccessEvent, } from './events';
import { FeedbackStateModel } from 'src/app/feedback/state/feedback.state';
import { Feedback } from 'src/app/models/feedback';

export class AppStateModel {
    initialized: boolean;
    error?: Error;
    user?: User;
    currentBank?: Bank;
    mybanks?: Bank[];
    otherBanks?: Bank[];
    preferences?: Preferences;
    feedbacks?: Feedback[];
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


    // Reset State to defaults
    @Action(ResetAppStateAction)
    resetComponentState(ctx: StateContext<AppStateModel>) {
        ctx.patchState({
            user: undefined,
            currentBank: undefined,
            mybanks: undefined,
            otherBanks: undefined,
            preferences: undefined
        });
    }

    // Login Events
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

    // Logout Events
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

    // Bank created
    @Action(AttachBankAction)
    attachBank({ patchState, getState }: StateContext<AppStateModel>, { payload }: AttachBankAction) {
        patchState({
            currentBank: payload,
            mybanks: [...getState().mybanks, payload]
        })
    }
    @Action(SuccessSaveNewBankEvent)
    saveedNewBank({ patchState, getState }: StateContext<AppStateModel>, { payload }: SuccessSaveNewBankEvent) {
        patchState({
            error: undefined,
            currentBank: { ...getState().currentBank, ...payload }
        })
    }

    // Selected Bank changed
    @Action(BankSelectionChangedEvent)
    bankSelectionChanged({ patchState, getState }: StateContext<AppStateModel>, { payload }: BankSelectionChangedEvent) {
        patchState({
            error: undefined,
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
    addNewHistorySuccess({ getState, setState }: StateContext<AppStateModel>, { payload }: AddNewHistoryActionSuccessEvent) {
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
    @Action(LoadBankHistorySuccessEvent)
    loadBankHistorySuccess({ setState, getState }: StateContext<AppStateModel>, { payload }: LoadBankHistorySuccessEvent) {
        const state = getState();
        setState({
            ...state,
            currentBank: { ...state.currentBank, history: payload }
        });
    }

    /**
     * Bank Loading
     */
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
    @Action(SuccessLoadMemberBanksEvent)
    successLoadMemberBanks({ patchState }: StateContext<AppStateModel>, { payload }: SuccessLoadMemberBanksEvent) {
        patchState({
            initialized: true,
            error: undefined,
            otherBanks: payload
        })
    }
    @Action(ErrorLoadMemberBanksEvent)
    errorLoadMemberBanks({ patchState }: StateContext<AppStateModel>, { payload }: ErrorLoadMemberBanksEvent) {
        patchState({
            error: payload
        })
    }
    /**
    * Owner changed
    */
    @Action(AddNewOwnerActionSuccessEvent)
    addNewOwnerSuccessful({ getState, patchState }: StateContext<AppStateModel>) {
        const currentBank = { ...getState().currentBank, owner: { ...getState().user } };
        patchState({ error: undefined, currentBank: currentBank });
    }
    @Action(AddNewOwnerActionFailEvent)
    addNewOwnerActionFailed({ patchState }: StateContext<BankStateModel>, { payload }: AddNewOwnerActionFailEvent) {
        patchState({
            error: payload
        })
    }
    /**
     * Preferences
     */
    @Action(LoadUserPreferencesSuccessfulEvent)
    successLoadingUserPreferencesEvent({ patchState }: StateContext<AppStateModel>, { payload }: LoadUserPreferencesSuccessfulEvent) {
        const preferences: Preferences = payload.length === 1 ? payload.pop() : undefined
        patchState({
            error: undefined, preferences: preferences
        })
    }
    @Action(LoadUserPreferencesFailEvent)
    errorLoadingUserPreferencesEvent({ patchState }: StateContext<AppStateModel>, { payload }: LoadUserPreferencesFailEvent) {
        patchState({
            error: payload
        })
    }
    @Action(UpdateUserPreferencesSuccessEvent)
    successUpdatingUserPreferencesEvent({ patchState }: StateContext<AppStateModel>, { payload }: UpdateUserPreferencesSuccessEvent) {
        patchState({
            error: undefined, preferences: payload
        })
    }
    @Action(UpdateUserPreferencesFailEvent)
    errorUpdatingUserPreferencesEvent(ctx: StateContext<AppStateModel>, { payload }: UpdateUserPreferencesFailEvent) {
        ctx.patchState({
            error: payload
        })
    }
    /**
     * Feedback
     */
    @Action(SendUserFeedbackSuccessEvent)
    sendFeedbackSuccessfull({ patchState, getState }: StateContext<AppStateModel>, { payload }: SendUserFeedbackSuccessEvent) {
        const feedbacks = [...getState().feedbacks, payload];
        patchState({ feedbacks: feedbacks, error: undefined })
    }
    @Action(SendUserFeedbackFailEvent)
    sendFeedbackFailed({ patchState }: StateContext<AppStateModel>, { payload }: SendUserFeedbackFailEvent) {
        patchState({ error: payload })
    }
    @Action(LoadUserFeedbackSuccessfulEvent)
    loadUserFeedbackSuccessfull({ patchState, getState }: StateContext<AppStateModel>, { payload }: LoadUserFeedbackSuccessfulEvent) {
        patchState({ feedbacks: payload, error: undefined })
    }
    @Action(LoadUserFeedbackFailEvent)
    loadUserFeedbackFail({ patchState }: StateContext<AppStateModel>, { payload }: LoadUserFeedbackFailEvent) {
        patchState({ error: payload })
    }
    /**
     * Navigation
     */
    @Action(RedirectToLoginAction)
    redirectToLogin({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
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
        dispatch(new Navigate(['/bank', getState().currentBank.id]));
    }

    @Action(RedirectToBankCreationAction)
    redirectToBankCreation({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined });
        dispatch(new Navigate(['/bank']));
    }

    @Action(RedirectToAction)
    redirectToDeposit({ dispatch, patchState }: StateContext<AppStateModel>) {
        patchState({ error: undefined }); dispatch(new Navigate(['/action']));
    }

}