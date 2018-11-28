export class ResetStateAction {
    static readonly type = '[BANK RESET] reset state to defaults';
}

export class LoadBankDetailsAction {
    static readonly type = '[BANK LOAD] load details of selected bank';
    constructor(public bankId: string, public userId: string) { }
}