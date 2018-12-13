import { Component, OnInit } from '@angular/core';
import { Select, Store, Actions, ofActionDispatched, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concat, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthState } from '../../state/auth.state';
import { GoogleLoginAction, LogoutAction, GoogleLoggedInEvent, LoginFailedEvent } from '../../state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Select(AuthState.errorMessage) _error: Observable<string>;
  @Select(AppState.currentUser) _user: Observable<User>;

  constructor(private store: Store, private actions: Actions) { }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    this.store.dispatch(new GoogleLoginAction).subscribe();
    this.actions.pipe(
      ofActionSuccessful(GoogleLoggedInEvent)
      , first()
    ).subscribe();
  }

  logout(): void {
    this.store.dispatch(new LogoutAction);
  }

}
