import { BalanceChange } from 'src/app/models/actions/balance-change';

export class SaveBalanceChangeAction {
    static readonly type = '[ACTION SAVE] save payment';
    constructor(public payload: BalanceChange) { }
}
export class SaveBalanceChangeSuccessEvent {
    static readonly type = '[ACTION SAVE] successfully saved payment';
    constructor(public payload: BalanceChange) { }
}
export class SaveBalanceChangeFailEvent {
    static readonly type = '[ACTION SAVE] failed on saving payment';
    constructor(public payload: string) { }
}