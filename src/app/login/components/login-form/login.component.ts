import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _user: Observable<User> = undefined;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    this._user = this.auth.loginWithGoogle();
  }

  logout(): void {
    this._user = this.auth.logout();
  }

}
