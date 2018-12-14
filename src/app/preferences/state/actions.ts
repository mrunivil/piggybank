import { Preferences } from 'src/app/models/preferences';
/**
 * Loading user preferences
 */
export class LoadUserPreferencesAction {
    static readonly type = '[PREFERENCES LOAD] load user preferences';
}
/**
 * Updating user preferences
 */
export class UpdateUserPreferencesAction {
    static readonly type = '[PREFERENCES UPDATE] update user related settings';
    constructor(public payload: Preferences) { }
}
