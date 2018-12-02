import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankCreationAction } from 'src/app/shared/state/actions';
import { AppState, AppStateModel } from 'src/app/shared/state/app.state';
import { DashboardState } from '../../state/dashboard.state';
import { LoadUserOwenedBanksAction } from '../../state/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AppState.currentUser) user$: Observable<User>;
  @Select(DashboardState.myOwenedBanks) banks$: Observable<Bank[]>;
  @Select(DashboardState.errorMessage) error$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserOwenedBanksAction(this.store.selectSnapshot(AppState.currentUser)));
  }

  createBank() {
    this.store.dispatch(new RedirectToBankCreationAction);
  }
}
