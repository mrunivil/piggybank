import { Action, State, StateContext, Store } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadUserPreferencesFailEvent, LoadUserPreferencesSuccessfulEvent, UpdateUserPreferencesFailEvent, UpdateUserPreferencesSuccessEvent } from 'src/app/shared/state/events';
import { PreferencesService } from '../services/preferences.service';
import { LoadUserPreferencesAction, UpdateUserPreferencesAction } from './actions';

export class PreferencesStateModel {
    initialized: boolean;
}
@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        initialized: false
    }
})
export class PreferencesState {
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
    @Action(LoadUserPreferencesAction)
    loadUserPreferences({ dispatch }: StateContext<PreferencesStateModel>) {
        this.preferencesService.getPreferences(this.store.selectSnapshot(AppState.currentUser).uid).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new LoadUserPreferencesSuccessfulEvent(res))
            , err => dispatch(new LoadUserPreferencesFailEvent(err)));
    }
    /**
     * Update User Preferences
     *
     * @param {StateContext<PreferencesStateModel>} { patchState, getState }
     * @param {UpdateUserPreferencesAction} { payload }
     */
    @Action(UpdateUserPreferencesAction)
    updateUserPreferences({ dispatch }: StateContext<PreferencesStateModel>, { payload }) {
        this.preferencesService.updatePreferences(payload).pipe(
            first()
            , retry(3)
        ).subscribe(res => dispatch(new UpdateUserPreferencesSuccessEvent(res))
            , err => dispatch(new UpdateUserPreferencesFailEvent(err)));
    }
}