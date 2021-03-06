import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogoutAction } from 'src/app/login/state/actions';
import { User } from 'src/app/models/user';
import { RedirectToLoginAction, RedirectToPreferencesAction, RedirectToFeedbackAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(AppState.currentUser) $user: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new RedirectToLoginAction);
  }

  logout() {
    this.store.dispatch(new LogoutAction);
  }
  sendFeedback() {
    this.store.dispatch(new RedirectToFeedbackAction);
  }
  preferences() {
    this.store.dispatch(new RedirectToPreferencesAction);
  }
}
