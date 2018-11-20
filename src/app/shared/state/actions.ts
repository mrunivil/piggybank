import { User } from 'src/app/models/user';
import { Preferences } from 'src/app/models/preferences';

export class ResetStateAction {
    static readonly type = '[APP RESET] reset state to defaults';
}

export class SetUserAction {
    static readonly type = '[APP SET USER INFORMATION] recieving user information';
    constructor(public payload: User) { }
}

export class SetUserPreferences {
    static readonly type = '[APP SET USER PREFERENCES] recieving user information';
    constructor(public payload: Preferences) { }
}

export class RedirectToLoginAction {
    static readonly type = '[APP REDIRECT] /login';
}