import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import * as auth from '../auth';
import { HttpClient } from '@angular/common/http';
import { take, concatMap, concatMapTo } from 'rxjs/operators';


@Injectable()
export class LocalAuthService extends auth.AuthService {

  user: User = null;

  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }

  loginWithGoogle(): Observable<User> {
    return this.http.get<User[]>('./mockdata/users.json').pipe(take(1), concatMap((res) => of(res.pop())));
  }

  logout(): Observable<User> {
    this.user = null;
    return of(this.user);
  }

}
