import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToDashboardAction, RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { ShareYourBankAction } from '../../state/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(AppState.currentBank) currentBank$: Observable<Bank>;
  @Select(AppState.currentUser) currentUser$: Observable<User>;

  @Input() title: string;
  @Input() backFunction: Function;
  constructor(private store: Store) { }

  share() {
    this.store.dispatch(new ShareYourBankAction);
  }

  back() {
    this.backFunction()
    // this.store.dispatch(new RedirectToDashboardAction);
  }

}
