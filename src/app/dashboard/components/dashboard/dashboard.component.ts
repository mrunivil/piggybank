import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankCreationAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadUserOwnedBanksAction } from '../../state/actions';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AppState.currentUser) user$: Observable<User>;
  @Select(DashboardState.errorMessage) error$: Observable<string>;

  @Select(DashboardState.myOwenedBanks) myBanks$: Observable<Bank[]>;
  @Select(DashboardState.OtherBanks) otherBanks$: Observable<Bank[]>;

  constructor(public store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadUserOwnedBanksAction(this.store.selectSnapshot(AppState.currentUser)));
  }

  createBank() {
    this.store.dispatch(new RedirectToBankCreationAction);
  }
}
