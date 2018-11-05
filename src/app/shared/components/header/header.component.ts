import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState, AppStateModel } from '../../state/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { GoogleLoginAction, LogoutAction } from 'src/app/login/state/actions';
import { Navigate } from '@ngxs/router-plugin';

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
    this.store.dispatch(new Navigate(['/login']));
  }

  logout() {
    this.store.dispatch(new LogoutAction);
  }

}
