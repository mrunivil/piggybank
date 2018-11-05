import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import * as auth from '../auth';


@Injectable()
export class LocalAuthService extends auth.AuthService {

  user: User = undefined;

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }
  loginWithGoogle(): Observable<User> {
    this.user = { uid: 'test', email: 'test.user@me.de' } as User;
    return of(this.user);
  }
  logout(): Observable<User> {
    this.user = undefined;
    return of(this.user);
  }

}
