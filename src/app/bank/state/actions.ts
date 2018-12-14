import { Bank } from 'src/app/models/bank';
import { Action } from 'src/app/models/action';
import { User } from 'src/app/models/user';
/**
 * Reset state back to defaults
 */
export class ResetStateAction {
    static readonly type = '[BANK RESET] reset state to defaults';
}
/**
 * Loading Details for selected Bank
 */
export class LoadBankDetailsAction {
    static readonly type = '[BANK LOAD] load details of selected bank';
    constructor(public bankId: string) { }
}
export class SuccessLoadBankDetailsEvent {
    static readonly type = '[BANK LOAD] success';
    constructor(public payload: Bank[]) { }
}
export class ErrorLoadBankDetailsEvent {
    static readonly type = '[BANK LOAD] failed';
    constructor(public payload: Error) { }
}
/**
 * Loading history for selected Bank
 */
export class LoadBankHistoryAction {
    static readonly type = '[BANK HISTORY] loading bank history';
    constructor(public payload: string) { }
}

/**
 * Save a new Bank
 */
export class SaveNewBankAction {
    static readonly type = '[BANK SAVE] save new bank';
    constructor(public payload: Bank) { }
}
export class SuccessSaveNewBankEvent {
    static readonly type = '[BANK SAVE] success';
    constructor(public payload: Bank) { }
}
export class ErrorSaveNewBankEvent {
    static readonly type = '[BANK SAVE] failed';
    constructor(public payload: string) { }
}
/**
 * Update a Bank
 */
export class UpdateBankAction {
    static readonly type = '[BANK UPDATE] update bank';
    constructor(public payload: Bank) { }
}
export class UpdateBankSuccessEvent {
    static readonly type = '[BANK UPDATE] success';
    constructor(public payload: Bank) { }
}
export class UpdateBankFailEvent {
    static readonly type = '[BANK UPDATE] failed';
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
    constructor(public id: string, public action: Action) { }
}
export class AddNewHistoryActionSuccessEvent {
    static readonly type = '[BANK UPDATE] added new history entry';
    constructor(public payload: Action) { }
}
export class AddNewHistoryActionFailEvent {
    static readonly type = '[BANK UPDATE] failed to add new history entry';
    constructor(public payload: Error) { }
}
/**
 * Adding a new owner entry for a specific bank
 */
export class AddNewOwnerAction {
    static readonly type = '[BANK UPDATE] adding new owner';
}
export class AddNewOwnerActionSuccessEvent {
    static readonly type = '[BANK UPDATE] added new owner';
}
export class AddNewOwnerActionFailEvent {
    static readonly type = '[BANK UPDATE] failed to add new owner';
    constructor(public payload: string) { }
}
/**
 * Action new Deposit
 */
export class CreateNewDepositAction {
    static readonly type = '[BANK DEPOSIT] start creating new deposit'
}
/**
 * Action new Payment
 */
export class CreateNewPaymentAction {
    static readonly type = '[BANK PAYMENT] start creating new payment'
}