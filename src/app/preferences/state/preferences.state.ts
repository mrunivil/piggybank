import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Preferences } from 'src/app/models/preferences';
import { PreferencesService } from '../services/preferences.service';
import { ErrorLoadingUserPreferencesEvent, ErrorUpdatingUserPreferencesEvent, LoadUserPreferences, SuccessLoadingUserPreferencesEvent, SuccessUpdatingUserPreferencesEvent, UpdateUserPreferences, ResetStateAction } from './actions';
import { ResetAppStateAction } from 'src/app/shared/state/actions';

export class PreferencesStateModel {
    error: string;
    preferences: Preferences
}

@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        error: null,
        preferences: { uid: null, allowNotifications: true, allowPhoto: true } as Preferences
    }
})
export class PreferencesState {

    @Selector()
    static userPreferences({ preferences }: PreferencesStateModel): Preferences {
        return preferences;
    }

    @Selector()
    static error({ error }: PreferencesStateModel): string {
        return error;
    }

    constructor(
        private store: Store,
        private preferencesService: PreferencesService
    ) { }

    /**
     * Load User Preferences
     *
     * @param {StateContext<PreferencesStateModel>} { dispatch }
     * @memberof PreferencesState
     */
    @Action(LoadUserPreferences)
    loadUserPreferences({ dispatch }: StateContext<PreferencesStateModel>, { payload }: LoadUserPreferences) {
        this.preferencesService.getPreferences(payload).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new SuccessLoadingUserPreferencesEvent(res))
            , err => dispatch(new ErrorLoadingUserPreferencesEvent(err)));
    }
    @Action(SuccessLoadingUserPreferencesEvent)
    successLoadingUserPreferencesEvent({ patchState }: StateContext<PreferencesStateModel>, { payload }: SuccessLoadingUserPreferencesEvent) {
        patchState({
            error: undefined,
            preferences: payload
        })
    }
    @Action(ErrorLoadingUserPreferencesEvent)
    errorLoadingUserPreferencesEvent({ patchState }: StateContext<PreferencesStateModel>, { payload }: ErrorLoadingUserPreferencesEvent) {
        patchState({
            error: payload
        })
    }

    /**
     * Update User Preferences
     *
     * @param {StateContext<PreferencesStateModel>} { patchState, getState }
     * @param {UpdateUserPreferences} { payload }
     */
    @Action(UpdateUserPreferences)
    updateUserPreferences({ dispatch }: StateContext<PreferencesStateModel>, { payload }) {
        this.preferencesService.updatePreferences(payload).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new SuccessUpdatingUserPreferencesEvent(res))
            , err => dispatch(new ErrorUpdatingUserPreferencesEvent(err)));
    }
    @Action(SuccessUpdatingUserPreferencesEvent)
    successUpdatingUserPreferencesEvent({ patchState }: StateContext<PreferencesStateModel>, { payload }: SuccessUpdatingUserPreferencesEvent) {
        patchState({
            error: undefined,
            preferences: payload
        })
    }
    @Action(ErrorUpdatingUserPreferencesEvent)
    errorUpdatingUserPreferencesEvent(ctx: StateContext<PreferencesStateModel>, { payload }: ErrorUpdatingUserPreferencesEvent) {
        ctx.patchState({
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
    resetAll({ dispatch }: StateContext<PreferencesStateModel>) {
        dispatch(new ResetStateAction);
    }
}