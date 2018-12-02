import { Preferences } from 'src/app/models/preferences';

/**
 * Loading user preferences
 */
export class LoadUserPreferences {
    static readonly type = '[PREFERENCES LOAD] load user preferences';
    constructor(public payload: string) { }
}
export class SuccessLoadingUserPreferencesEvent {
    static readonly type = '[PREFERENCES LOAD] success'
    constructor(public payload: Preferences) { }
}
export class ErrorLoadingUserPreferencesEvent {
    static readonly type = '[PREFERENCES LOAD] failed'
    constructor(public payload: string) { }
}
/**
 * Updating user preferences
 */
export class UpdateUserPreferences {
    static readonly type = '[PREFERENCES UPDATE] update user related settings';
    constructor(public payload: Preferences) { }
}
export class SuccessUpdatingUserPreferencesEvent {
    static readonly type = '[PREFERENCES UPDATE] success'
    constructor(public payload: Preferences) { }
}
export class ErrorUpdatingUserPreferencesEvent {
    static readonly type = '[PREFERENCES UPDATE] failed'
    constructor(public payload: string) { }
}