import { CheckSession } from './../../../login/state/actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankCreationAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import {
  LoadMemberBanksAction,
  LoadUserOwnedBanksAction
} from '../../state/actions';
/**
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(AppState.currentUser) user$: Observable<User>;
  @Select(AppState.myBanks) myBanks$: Observable<Bank[]>;
  @Select(AppState.otherBanks) otherBanks$: Observable<Bank[]>;

  showMyBanks = true;
  showOthersBanks = true;

  constructor(public store: Store) {}

  ngOnInit() {
    this.store.dispatch([
      new LoadUserOwnedBanksAction(
        this.store.selectSnapshot(AppState.currentUser)
      ),
      new LoadMemberBanksAction(this.store.selectSnapshot(AppState.currentUser))
    ]);
  }

  createBank() {
    this.store.dispatch(new RedirectToBankCreationAction());
  }

  toggleMyBanks() {
    this.showMyBanks = !this.showMyBanks;
  }

  toggleOthersBanks() {
    this.showOthersBanks = !this.showOthersBanks;
  }
}
