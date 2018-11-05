import { User } from 'src/app/models/user';

export class GoogleLoggedInEvent {
    static readonly type = '[AUTH LOGIN SUCCESSFUL] user logged in';
    constructor(public payload: User) { }
}

export class LoginFailedEvent {
    static readonly type = '[AUTH LOGIN FAILED] error while logging in';
    constructor(public payload: string) { }
}

export class LoggedOutEvent {
    static readonly type = '[AUTH LOGOUT SUCCESSFUL] user logged out';
}

export class LoggedOutFailedEvent {
    static readonly type = '[AUTH LOGOUT FAILED] error while logging out';
    constructor(public payload: string) { }
}