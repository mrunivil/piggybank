import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface AuthServiceInterface {

    getCurrentUser(): Observable<User>;

    loginWithGoogle(): Observable<User>;

    logout(): Observable<User>;

}

@Injectable()
export abstract class AuthService implements AuthServiceInterface {
    protected endpoint = environment.endpoint;

    abstract getCurrentUser(): Observable<User>;

    abstract loginWithGoogle(): Observable<User>;

    abstract logout(): Observable<User>;
}
