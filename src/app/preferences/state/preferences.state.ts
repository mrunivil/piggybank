import { State, NgxsOnInit, StateContext, Store, Action, Selector } from '@ngxs/store';
import { Preferences } from 'src/app/models/preferences';
import { PreferencesService } from '../services/preferences.service';
import { User } from 'src/app/models/user';
import { take, catchError, tap } from 'rxjs/operators';
import { LoadUserPreferences, UpdateUserPreferences } from './actions';
import { Observable } from 'rxjs';

export class PreferencesStateModel {
    error: string;
    uid: string;
    preferences: Preferences
}

@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        error: null,
        uid: null,
        preferences: { uid: null, allowNotifications: true, allowPhoto: true } as Preferences
    }
})
export class PreferencesState implements NgxsOnInit {

    @Selector()
    static userPreferences({ preferences }: PreferencesStateModel): Preferences {
        return preferences;
    }

    constructor(
        private store: Store,
        private preferencesService: PreferencesService
    ) { }

    ngxsOnInit({ patchState, getState }: StateContext<PreferencesStateModel>) {
        const user = this.store.selectSnapshot<User>((state) => state.app.user);
        patchState({
            uid: user.uid
        })
    }

    @Action(LoadUserPreferences)
    loadUserPreferences({ patchState, getState }: StateContext<PreferencesStateModel>) {
        this.preferencesService.getPreferences(getState().uid).pipe(
            take(1)
        ).subscribe(res => {
            patchState({
                preferences: res
            })
        }, err => patchState({
            error: err
        }));
    }

    @Action(UpdateUserPreferences)
    updateUserPreferences({ patchState, getState }: StateContext<PreferencesStateModel>, { payload }: UpdateUserPreferences) {
        return this.preferencesService.updatePreferences(payload).pipe(
            take(1),
            tap(() => {
                // debugger;
                patchState({ preferences: payload });
            })
            , catchError((e) => {
                // debugger
                // patchState({ preferences: getState().preferences });
                console.error(`Error while saving new Bank:${e}`);
                throw e;
            })
        );
    }
}