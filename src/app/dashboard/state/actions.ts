import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';

/**
 * Reset state
 */
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
    static readonly type = '[DASHBOARD LOAD] success load owners banks';
    constructor(public payload: Bank[]) { }
}
export class ErrorLoadUserOwnedBanksEvent {
    static readonly type = '[DASHBOARD LOAD] failed load owners banks';
    constructor(public payload: Error) { }
}

/**
 * Loading banks owned by others and logged in user is member
 */
export class LoadMemberBanksAction {
    static readonly type = '[DASHBOARD LOAD] load banks for member';
    constructor(public payload: User) { }
}
export class SuccessLoadMemberBanksEvent {
    static readonly type = '[DASHBOARD LOAD] success load members banks';
    constructor(public payload: Bank[]) { }
}
export class ErrorLoadMemberBanksEvent {
    static readonly type = '[DASHBOARD LOAD] failed  load members banks';
    constructor(public payload: Error) { }
}

/**
 * Prevent a complete reload and just add created bank to state
 */
export class AttachBankAction {
    static readonly type = '[DASHBOARD ATTACH] attach new created bank';
    constructor(public payload: Bank) { }
}