import { State, NgxsOnInit, StateContext, Store, Action, Selector } from '@ngxs/store';
import { Preferences } from 'src/app/models/preferences';
import { PreferencesService } from '../services/preferences.service';
import { User } from 'src/app/models/user';
import { take, catchError, tap, retry, first } from 'rxjs/operators';
import { LoadUserPreferences, UpdateUserPreferences, SuccessLoadingUserPreferencesEvent, ErrorLoadingUserPreferencesEvent, SuccessUpdatingUserPreferencesEvent, ErrorUpdatingUserPreferencesEvent } from './actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/state/app.state';
import { dispatch } from 'rxjs/internal/observable/range';

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
    loadUserPreferences({ dispatch }: StateContext<PreferencesStateModel>) {
        this.preferencesService.getPreferences(this.store.selectSnapshot(AppState.currentUser).uid).pipe(
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
     * @returns
     * @memberof PreferencesState
     */
    @Action(UpdateUserPreferences)
    updateUserPreferences({ dispatch }: StateContext<PreferencesStateModel>, { payload }) {
        return this.preferencesService.updatePreferences(payload).pipe(
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

}