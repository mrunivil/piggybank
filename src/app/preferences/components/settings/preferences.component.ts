import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { PreferencesState, PreferencesStateModel } from '../../state/preferences.state';
import { Observable, of, Subscription } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { take, catchError } from 'rxjs/operators';
import { UpdateUserPreferences } from '../../state/actions';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  @Select(PreferencesState.userPreferences) preferences$: Observable<Preferences>;

  preferences: Preferences = { allowNotifications: true, allowPhoto: true, uid: null } as Preferences;
  error: string;


  constructor(private store: Store) { }

  ngOnInit() {
    this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
  }

  ngOnDestroy() {
  }

  backToDashboard() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  updateAvataSettings($event?: CustomEvent) {
    this.preferences.allowPhoto = !this.preferences.allowPhoto;
    this.updatePreferences($event);
  }

  updateNotificationSettings($event?: CustomEvent) {
    this.preferences.allowNotifications = !this.preferences.allowNotifications;
    this.updatePreferences($event);
  }

  updatePreferences($event?: CustomEvent) {
    this.store.dispatch(new UpdateUserPreferences(this.preferences)).
      subscribe(() => {
        this.error = undefined;
        this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
      }, (err) => {
        this.error = err;
        this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
      });
  }
}
