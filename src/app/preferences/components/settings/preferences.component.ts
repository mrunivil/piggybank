import { Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Preferences } from 'src/app/models/preferences';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadUserPreferencesAction, UpdateUserPreferencesAction } from '../../state/actions';
import { LoadUserPreferencesSuccessfulEvent, UpdateUserPreferencesSuccessEvent } from 'src/app/shared/state/events';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  @Select(AppState.preferences) preferences$: Observable<Preferences>;

  constructor(private store: Store, private actions: Actions) { }

  ngOnInit() {
    this.store.dispatch(new LoadUserPreferencesAction);
  }

  backToDashboard() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  updateAvataSettings($event?: CustomEvent) {
    const preferences = { ...this.store.selectSnapshot(AppState.preferences) };
    preferences.allowPhoto = !preferences.allowPhoto;
    this.updatePreferences(preferences, $event);
  }

  updateNotificationSettings($event?: CustomEvent) {
    const preferences = { ...this.store.selectSnapshot(AppState.preferences) };
    preferences.allowNotifications = !preferences.allowNotifications;
    this.updatePreferences(preferences, $event);
  }

  updatePreferences(preferences: Preferences, $event: CustomEvent) {
    this.store.dispatch(new UpdateUserPreferencesAction({ ...preferences, uid: this.store.selectSnapshot(AppState.currentUser).uid }));
  }

  /**
   * State Testing
   */
  loadUserPreferences() {
    this.store.dispatch(new LoadUserPreferencesAction);
    this.actions.pipe(
      ofActionSuccessful(LoadUserPreferencesSuccessfulEvent)
      , first()
    ).subscribe(res => alert(JSON.stringify(res)));
  }
  updateUserPreferences() {
    this.store.dispatch(new UpdateUserPreferencesAction({
      allowNotifications: true,
      allowPhoto: false,
      uid: '123456'
    }));
    this.actions.pipe(
      ofActionSuccessful(UpdateUserPreferencesSuccessEvent)
      , first()
    ).subscribe(res => alert(JSON.stringify(res)));
  }
}