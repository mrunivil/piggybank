import { Component, OnInit, Input } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/shared/state/app.state';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(AppState.currentUser) $user: Observable<User>;

  @Input() title: string;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  back() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

}