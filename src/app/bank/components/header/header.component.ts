import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(AppState.currentBank) currentBank$: Observable<Bank>;
  @Select(AppState.currentUser) currentUser$: Observable<User>;

  @Input() title: string;

  constructor(private store: Store) { }

  share() {
    throw new Error('sharing piggy banks is not implemented yet');
  }

  back() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

}
