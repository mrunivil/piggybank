import { Bank } from 'src/app/models/bank';

export class ResetStateAction {
    static readonly type = '[BANK RESET] reset state to defaults';
}

export class LoadBankDetailsAction {
    static readonly type = '[BANK LOAD] load details of selected bank';
    constructor(public bankId: string, public userId: string) { }
}

export class SaveNewBankAction {
    static readonly type = '[BANK SAVE] save new bank';
    constructor(public payload: Bank) { }
}