import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { PreferencesState, PreferencesStateModel } from '../../state/preferences.state';
import { Observable, of } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { take } from 'rxjs/operators';
import { UpdateUserPreferences } from '../../state/actions';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  @Select(PreferencesState.userPreferences) $preferences: Observable<Preferences>;

  preferences: Preferences = { allowNotifications: true, allowPhoto: true, uid: null } as Preferences;

  constructor(private store: Store) { }

  ngOnInit() {
    this.$preferences.pipe(take(1)).subscribe((preferences) => this.preferences = preferences);
  }

  backToDashboard() {
    this.store.dispatch(new Navigate(['/dashboard']));
  }

  updatePreferences($event?: CustomEvent) {
    this.store.dispatch(new UpdateUserPreferences({ ...this.preferences }));
  }

}
