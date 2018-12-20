import { Bank } from 'src/app/models/bank';

export class ResetAppStateAction {
    static readonly type = '[APP RESET] reset state to defaults';
}
export class BankSelectionChangedEvent {
    static readonly type = '[APP SET SELECTED BANK] user selected bank';
    constructor(public payload: Bank) { }
}
export class RedirectToLoginAction {
    static readonly type = '[APP REDIRECT] /login';
    constructor(public payload?: URL) { }
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
}

export class RedirectToAction {
    static readonly type = '[APP REDIRECT] /action';
}