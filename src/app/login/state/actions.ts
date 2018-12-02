import { User } from 'src/app/models/user';

export class ResetStateAction {
    static readonly type = '[AUTH RESET] reset state to defaults';
}
export class GoogleLoginAction {
    static readonly type = '[AUTH LOGIN] login with google';
}
export class GoogleLoggedInEvent {
    static readonly type = '[AUTH LOGIN SUCCESSFUL] user logged in';
    constructor(public payload: User) { }
}
export class LoginFailedEvent {
    static readonly type = '[AUTH LOGIN FAILED] error while logging in';
    constructor(public payload: string) { }
}
export class LogoutAction {
    static readonly type = '[AUTH LOGOUT] logging out current user';
}
export class LoggedOutEvent {
    static readonly type = '[AUTH LOGOUT SUCCESSFUL] user logged out';
}
export class LoggedOutFailedEvent {
    static readonly type = '[AUTH LOGOUT FAILED] error while logging out';
    constructor(public payload: string) { }
}