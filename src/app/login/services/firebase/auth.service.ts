import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { Observable, of, from } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService extends AuthService {
  constructor(private fireauth: AngularFireAuth) {
    super();
  }

  getCurrentUser(): Observable<User> {
    return this.fireauth.authState;
  }

  loginWithGoogle(): Observable<User> {
    return from(
      this.fireauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).pipe(map((uc: firebase.auth.UserCredential) => uc.user));
  }

  logout(): Observable<User> {
    return from(this.fireauth.auth.signOut()).pipe(map(_ => undefined));
  }
}
