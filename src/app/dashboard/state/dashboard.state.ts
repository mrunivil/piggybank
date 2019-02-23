import { Bank } from './../../models/bank';
import { Action, State, StateContext } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import {
  LoadMemberBanksAction,
  LoadMemberBanksFailEvent,
  LoadMemberBanksSuccessEvent,
  LoadUserOwnedBanksAction,
  LoadUserOwnedBanksFailEvent,
  LoadUserOwnedBanksSuccessEvent
} from './actions';
import { Observable, Subscription } from 'rxjs';
import { LogoutSuccessfulEvent } from 'src/app/shared/state/events';

export class DashboardStateModel {
  initialized: boolean;
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    initialized: false
  }
})
export class DashboardState {
  constructor(private bankService: DashboardService) {}

  myBanks: Subscription;
  otherBanks: Subscription;

  /**
   * Load banks owned by the user
   *
   * @param {StateContext<DashboardStateModel>} { patchState, getState }
   * @param {LoadUserOwnedBanksAction} { payload }
   * @memberof DashboardState
   */
  @Action(LoadUserOwnedBanksAction)
  loadUserOwnedBanks(
    { dispatch, getState }: StateContext<DashboardStateModel>,
    { payload, force }: LoadUserOwnedBanksAction
  ) {
    if (!this.myBanks) {
      this.myBanks = this.bankService
        .getMyOwenedBanks(payload.uid)
        .subscribe(
          res => dispatch(new LoadUserOwnedBanksSuccessEvent(res)),
          err => dispatch(new LoadUserOwnedBanksFailEvent(err))
        );
    }
  }
  /**
   * Load banks owned by others and logged in user is member
   *
   * @param {StateContext<DashboardStateModel>} { patchState, getState }
   * @param {LoadMemberBanksAction} { payload }
   * @memberof DashboardState
   */
  @Action(LoadMemberBanksAction)
  loadMemberBanks(
    { dispatch, getState }: StateContext<DashboardStateModel>,
    { payload }: LoadMemberBanksAction
  ) {
    if (!this.otherBanks) {
      this.otherBanks = this.bankService
        .getMyOtherBanks(payload.uid)
        .subscribe(
          res => dispatch(new LoadMemberBanksSuccessEvent(res)),
          err => dispatch(new LoadMemberBanksFailEvent(err))
        );
    }
  }

  @Action(LogoutSuccessfulEvent)
  loggedOut() {
    this.myBanks.unsubscribe();
    this.myBanks = undefined;

    this.otherBanks.unsubscribe();
    this.otherBanks = undefined;
  }
}
