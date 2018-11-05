import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';

export interface Auth {

    getCurrentUser(): Observable<User>;

    loginWithGoogle(): Observable<User>;

    logout(): Observable<User>;

}

@Injectable()
export abstract class AuthService implements Auth {
    abstract getCurrentUser(): Observable<User>;

    abstract loginWithGoogle(): Observable<User>;

    abstract logout(): Observable<User>;
}
