import { Preferences } from 'src/app/models/preferences';

export class LoadUserPreferences {
    static readonly type = '[PREFERENCES LOAD] load user preferences';
}

export class UpdateUserPreferences {
    static readonly type = '[PREFERENCES UPDATE] update user related settings';
    constructor(public payload: Preferences) { }
}