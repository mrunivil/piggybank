import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppStateModel, AppState } from 'src/app/shared/state/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoadUserOwenedBanksAction } from '../../state/actions';
import { RedirectToBankCreationAction } from 'src/app/shared/state/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AppState.currentUser) user$: Observable<User>;

  constructor(private store: Store) {
    this.store.dispatch(new LoadUserOwenedBanksAction);
  }

  ngOnInit() {
  }

  createBank() {
    this.store.dispatch(new RedirectToBankCreationAction);
  }
}
