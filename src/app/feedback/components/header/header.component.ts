import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogoutAction } from 'src/app/login/state/actions';
import { User } from 'src/app/models/user';
import { RedirectToLoginAction, RedirectToPreferencesAction, RedirectToFeedbackAction, RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Select(AppState.currentUser) $user: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  back() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

  sendFeedback() {
    this.store.dispatch(new RedirectToFeedbackAction);
  }

}
