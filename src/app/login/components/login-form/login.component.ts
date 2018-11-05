import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthState } from '../../state/auth.state';
import { GoogleLoginAction, LogoutAction } from '../../state/actions';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Select(AuthState.errorMessage) _error: Observable<string>;
  @Select(AppState.currentUser) _user: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    this.store.dispatch(new GoogleLoginAction);
  }

  logout(): void {
    this.store.dispatch(new LogoutAction);
  }

}
