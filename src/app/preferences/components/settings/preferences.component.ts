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

  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
    // this.subscription = this.preferences$.subscribe(pref => this.preferences = pref);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backToDashboard() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  updatePreferences($event?: CustomEvent) {
    console.log('sending:' + { preferences: this.preferences });
    this.store.dispatch(new UpdateUserPreferences(this.preferences)).
      subscribe(() => {
        this.error = undefined;
        this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
      }, (err) => {
        this.error = err;
        this.preferences = { ...this.store.selectSnapshot(PreferencesState.userPreferences) };
      });
  }

  output() {
    console.log({ preferences: this.store.selectSnapshot(PreferencesState.userPreferences) });
  }
}
