import { Bank } from 'src/app/models/bank';
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
    constructor(public bankId: string, public userId: string) { }
}
export class SuccessLoadBankDetailsEvent {
    static readonly type = '[BANK LOAD] success';
    constructor(public payload: Bank) { }
}
export class ErrorLoadBankDetailsEvent {
    static readonly type = '[BANK LOAD] failed';
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