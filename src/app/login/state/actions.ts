export class ResetStateAction {
    static readonly type = '[AUTH RESET] reset state to defaults';
}

export class GoogleLoginAction {
    static readonly type = '[AUTH LOGIN] login with google';
}

export class LogoutAction {
    static readonly type = '[AUTH LOGOUT] logging out current user';
}