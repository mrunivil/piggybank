import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppStateModel, AppState } from 'src/app/shared/state/app.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AppState.currentUser) user$: Observable<User>;

  constructor() { }

  ngOnInit() {
  }

}
