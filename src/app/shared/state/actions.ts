import { User } from 'src/app/models/user';
import { Preferences } from 'src/app/models/preferences';

export class ResetAppStateAction {
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

export class RedirectToPreferencesAction {
    static readonly type = '[APP REDIRECT] /preferences';
}

export class RedirectToFeedbackAction {
    static readonly type = '[APP REDIRECT] /feedback';
}

export class RedirectToDashboardAction {
    static readonly type = '[APP REDIRECT] /dashboard';
}

export class RedirectToBankCreationAction {
    static readonly type = '[APP REDIRECT] /bank';
}

export class RedirectToBankDetailsAction {
    static readonly type = '[APP REDIRECT] /bank/:id';
    constructor(public payload: string) { }
}

export class RedirectToDepositAction {
    static readonly type = '[APP REDIRECT] /action/deposit';
}

export class RedirectToPaymentAction {
    static readonly type = '[APP REDIRECT] /action/payment';
}