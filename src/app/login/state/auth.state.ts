import { Action, State, StateContext, Selector } from '@ngxs/store';
import { first, retry, tap, delay } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from '../services/auth';
import { LoginAction, LogoutAction, CheckSession } from './actions';
import { ResetStateAction } from 'src/app/bank/state/actions';
import {
  LoginSuccessfulEvent,
  LoginFailedEvent,
  LogoutSuccessfulEvent,
  LoggedOutFailedEvent
} from 'src/app/shared/state/events';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
export class AuthStateModel {
  initialized: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false
  }
})
export class AuthState {
  @Selector()
  static initialized({ initialized }: AuthStateModel) {
    return initialized;
  }

  constructor(private authService: AuthService) {}

  /**
   * Check Session for logged in user
   *
   * @param {StateContext<AuthStateModel>} { dispatch }
   * @memberof AuthState
   */
  @Action(CheckSession)
  checkSession({ dispatch, patchState }: StateContext<AuthStateModel>) {
    return this.authService.getCurrentUser().pipe(
      delay(1000),
      tap(user => {
        patchState({
          initialized: true
        });
        if (user && user !== null) {
          dispatch(new LoginSuccessfulEvent(user));
        }
      })
    );
  }

  /**
   * Login with Google Account
   *
   * @param {StateContext<AuthStateModel>} { dispatch }
   * @memberof AuthState
   */
  @Action(LoginAction)
  loginWithGoogle({ dispatch }: StateContext<AuthStateModel>) {
    dispatch(new ResetStateAction())
      .pipe(first())
      .subscribe(_ => {
        this.authService
          .loginWithGoogle()
          .pipe(
            first(),
            retry(3)
          )
          .subscribe(
            (res: User) => {
              dispatch(new LoginSuccessfulEvent(res));
            },
            err => {
              dispatch(new LoginFailedEvent(err));
            }
          );
      });
  }
  /**
   *
   * @param ctx Logout Action
   */
  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>) {
    this.authService
      .logout()
      .pipe(
        first(),
        retry(3)
      )
      .subscribe(
        () => {
          ctx.dispatch(new LogoutSuccessfulEvent());
        },
        err => {
          ctx.dispatch(new LoggedOutFailedEvent(err));
        }
      );
  }
}
