import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { RedirectToLoginAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoginSuccessfulEvent, LogoutSuccessfulEvent } from 'src/app/shared/state/events';
import { LoginAction, LogoutAction } from '../../state/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Select(AppState.currentUser) _user: Observable<User>;
  returnUrl: string;
  constructor(private store: Store, private actions: Actions) { }


  loginWithGoogle(): void {
    this.store.dispatch(new LoginAction);
    this.actions.pipe(
      ofActionSuccessful(LoginSuccessfulEvent)
      , first()
    ).subscribe(_ => {
      const target = this.store.selectSnapshot(AppState.redirectPath);
      if (target) {
        const params = {};
        target.searchParams.forEach((val, key) => {
          params[key] = val;
        })
        this.store.dispatch(new Navigate([target.pathname, params]));
      } else {
        this.store.dispatch(new Navigate(['/dashboard']));
      }
    })
  }

  logout(): void {
    this.store.dispatch(new LogoutAction);
    this.actions.pipe(
      ofActionSuccessful(LogoutSuccessfulEvent)
      , first()
    ).subscribe(_ => {
      debugger
      this.store.dispatch(new RedirectToLoginAction);
    });
  }


  /**
   * DEBUGGING PURPOSE
   */
  loginRandomUser() {
    this.store.dispatch(new LoginAction);
    this.actions.pipe(
      ofActionSuccessful(LoginSuccessfulEvent)
      , first()
      , tap(res => {
        alert(JSON.stringify(res));
      })
    ).subscribe()
  }
  logoutRandomUser() {
    this.store.dispatch(new LogoutAction);
    this.actions.pipe(
      ofActionSuccessful(LogoutSuccessfulEvent)
      , first()
      , tap(res => {
        alert(JSON.stringify(res));
      })
    ).subscribe()
  }

}
