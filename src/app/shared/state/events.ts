import { User } from 'src/app/models/user';
import { Preferences } from 'src/app/models/preferences';
import { Feedback } from 'src/app/models/feedback';
import { Bank } from 'src/app/models/bank';
import { History } from 'src/app/models/action';

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
/**
 * Feedback Events
 */
export class SendUserFeedbackSuccessEvent {
    static readonly type = '[FEEDBACK SEND] sending feedback successful';
    constructor(public payload: Feedback) { }
}
export class SendUserFeedbackFailEvent {
    static readonly type = '[FEEDBACK SEND] sending feedback failed';
    constructor(public payload: Error) { }
}
export class LoadUserFeedbackSuccessfulEvent {
    static readonly type = '[FEEDBACK LOAD] loading user related feedback successful';
    constructor(public payload: Feedback[]) { }
}
export class LoadUserFeedbackFailEvent {
    static readonly type = '[FEEDBACK LOAD] loading user related feedback fail';
    constructor(public payload: Error) { }
}
/**
 * Bank Events
 */
export class LoadBankHistorySuccessEvent {
    static readonly type = '[BANK HISTORY] success loading bank history';
    constructor(public payload: History[]) { }
}
export class LoadBankHistoryFailEvent {
    static readonly type = '[BANK HISTORY] failed loading history';
    constructor(public payload: Error) { }
}