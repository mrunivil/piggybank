import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { Token } from 'src/app/models/token';
/**
 * Reset state back to defaults
 */
export class ResetStateAction {
    static readonly type = '[BANK RESET] reset state to defaults';
}
/**
 * Create and save a new Bank
 */
export class SaveNewUserBankAction {
    static readonly type = '[BANK SAVE] save new bank for current user';
    constructor(public payload: Bank) { }
}
export class SaveNewUserBankSuccessEvent {
    static readonly type = '[BANK SAVE] done saving new bank for current user';
    constructor(public payload: Bank) { }
}
export class SaveNewUserBankFailEvent {
    static readonly type = '[BANK SAVE] error while saving new bank for current user';
    constructor(public payload: Bank) { }
}
/**
 * Update a Bank
 */
export class UpdateUserBankAction {
    static readonly type = '[BANK UPDATE] update bank';
    constructor(public payload: Bank) { }
}
export class UpdateUserBankSuccessEvent {
    static readonly type = '[BANK UPDATE] success';
    constructor(public payload: Bank) { }
}
export class UpdateUserBankFailEvent {
    static readonly type = '[BANK UPDATE] failed';
    constructor(public payload: string) { }
}
/**
 * Loading history for selected Bank
 */
export class LoadBankHistoryAction {
    static readonly type = '[BANK HISTORY] loading bank history for selected bank';
    constructor(public payload: string) { }
}
/**
 * Toggle History Details
 */
export class ToggleHistoryDteailsAction {
    static readonly type = '[BANK SAVE] toggle history details';
}
/**
 * Adding a new history entry for a specific bank
 */
export class AddNewHistoryAction {
    static readonly type = '[BANK UPDATE] adding new history entry';
    constructor(public id: string, public action: History) { }
}
export class AddNewHistorySuccessEvent {
    static readonly type = '[BANK UPDATE] added new history entry';
    constructor(public payload: History) { }
}
export class AddNewHistoryFailEvent {
    static readonly type = '[BANK UPDATE] failed to add new history entry';
    constructor(public payload: Error) { }
}
/**
 * Share Bank
 */
export class ShareYourBankAction {
    static readonly type = '[BANK SHARE] generating token and call share'
}
export class ShareedYourBankSuccessfullEvent {
    static readonly type = '[BANK SHARE] successfully shared your bank';
    constructor(public payload: Token) { }
}
export class ShareedYourBankFailEvent {
    static readonly type = '[BANK SHARE] failed to shared your bank';
    constructor(public payload: Error) { }
}