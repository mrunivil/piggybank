export class CheckSession {
  static readonly type = '[AUTH LOGIN] check session';
}

export class LoginAction {
  static readonly type = '[AUTH LOGIN] login with google';
}
export class LogoutAction {
  static readonly type = '[AUTH LOGOUT] logging out current user';
}
