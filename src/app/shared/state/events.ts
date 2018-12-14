import { User } from 'src/app/models/user';
import { Preferences } from 'src/app/models/preferences';

/**
 * Login Events
 */
export class LoginSuccessfulEvent {
    static readonly type = '[AUTH LOGIN SUCCESSFUL] user logged in';
    constructor(public payload: User) { }
}
export class LoginFailedEvent {
    static readonly type = '[AUTH LOGIN FAILED] error while logging in';
    constructor(public payload: Error) { }
}
/**
 * Logout Events
 */
export class LogoutSuccessfulEvent {
    static readonly type = '[AUTH LOGOUT SUCCESSFUL] user logged out';
}
export class LoggedOutFailedEvent {
    static readonly type = '[AUTH LOGOUT FAILED] error while logging out';
    constructor(public payload: Error) { }
}
/**
 * Preferences Events
 */
export class LoadUserPreferencesSuccessfulEvent {
    static readonly type = '[PREFERENCES LOAD] success'
    constructor(public payload: Preferences[]) { }
}
export class LoadUserPreferencesFailEvent {
    static readonly type = '[PREFERENCES LOAD] failed'
    constructor(public payload: Error) { }
}
export class UpdateUserPreferencesSuccessEvent {
    static readonly type = '[PREFERENCES UPDATE] success'
    constructor(public payload: Preferences) { }
}
export class UpdateUserPreferencesFailEvent {
    static readonly type = '[PREFERENCES UPDATE] failed'
    constructor(public payload: Error) { }
}