import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { PreferencesState, PreferencesStateModel } from '../../state/preferences.state';
import { Observable, of, Subscription } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { last, take, catchError, first, tap } from 'rxjs/operators';
import { UpdateUserPreferences, LoadUserPreferences } from '../../state/actions';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  @Select(PreferencesState.userPreferences) preferences$: Observable<Preferences>;
  @Select(PreferencesState.error) error$: Observable<string>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadUserPreferences(this.store.selectSnapshot(AppState.currentUser).uid)).pipe(first()).subscribe();
  }

  ngOnDestroy() {
  }

  backToDashboard() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  updateAvataSettings($event?: CustomEvent) {
    const preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
    preferences.allowPhoto = !preferences.allowPhoto;
    this.updatePreferences(preferences, $event);
  }

  updateNotificationSettings($event?: CustomEvent) {
    const preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
    preferences.allowNotifications = !preferences.allowNotifications;
    this.updatePreferences(preferences, $event);
  }

  updatePreferences(preferences: Preferences, $event?: CustomEvent) {
    this.store.dispatch(new UpdateUserPreferences(preferences));
  }
}