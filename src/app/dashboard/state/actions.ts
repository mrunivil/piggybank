import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';

export class ResetStateAction {
    static readonly type = '[DASHBOARD RESET] reset state to defaults';
}

/**
 * Loading banks owned by logged in user
 */
export class LoadUserOwnedBanksAction {
    static readonly type = '[DASHBOARD LOAD] load user owened assets';
    constructor(public payload: User) { }
}
export class SuccessLoadUserOwnedBanksEvent {
    static readonly type = '[DASHBOARD LOAD] success';
    constructor(public payload: Bank[]) { }
}
export class ErrorLoadUserOwnedBanksEvent {
    static readonly type = '[DASHBOARD LOAD] failed';
    constructor(public payload: string) { }
}

export class AttachBankAction {
    static readonly type = '[DASHBOARD ATTACH] attach new created bank';
    constructor(public payload: Bank) { }
}