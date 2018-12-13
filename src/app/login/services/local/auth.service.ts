import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, delay, first, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth';
import { shuffle } from 'lodash';

@Injectable()
export class LocalAuthService extends AuthService {

  user: User = null;

  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }

  loginWithGoogle(): Observable<User> {
    return this.http.get<User[]>(`${this.endpoint}/users`).pipe(
      first()
      , delay(500)
      , tap(val => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong!');
        }
      })
      , concatMap((res) => {
        return of(shuffle(res).pop());
      }));
  }

  logout(): Observable<User> {
    this.user = null;
    return of(this.user).pipe(
      first()
      , delay(500)
      , tap(val => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong!');
        }
      })
    );
  }

}
