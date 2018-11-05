import { Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable()
export class FirebaseAuthService extends AuthService {

  getCurrentUser(): Observable<User> {
    throw 'not implemented yet';
  }

  loginWithGoogle(): Observable<User> {
    throw 'not implemented yet';
  }

  logout(): Observable<User> {
    throw 'not implemented yet';
  }

}
