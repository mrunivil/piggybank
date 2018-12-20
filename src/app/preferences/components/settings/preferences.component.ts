import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadUserPreferencesAction, UpdateUserPreferencesAction } from '../../state/actions';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  @Select(AppState.preferences) preferences$: Observable<Preferences>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadUserPreferencesAction);
  }

  backToDashboard() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  updateAvataSettings($event?: CustomEvent) {
    this.updatePreferences({ ...this.store.selectSnapshot(AppState.preferences), allowPhoto: !this.store.selectSnapshot(AppState.preferences).allowPhoto }, $event);
  }

  updateNotificationSettings($event?: CustomEvent) {
    this.updatePreferences({ ...this.store.selectSnapshot(AppState.preferences), allowNotifications: !this.store.selectSnapshot(AppState.preferences).allowNotifications }, $event);
  }

  updatePreferences(preferences: Preferences, $event: CustomEvent) {
    this.store.dispatch(new UpdateUserPreferencesAction({ ...preferences, uid: this.store.selectSnapshot(AppState.currentUser).uid }));
  }
}