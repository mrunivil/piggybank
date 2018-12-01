import { Bank } from 'src/app/models/bank';

export class ResetStateAction {
    static readonly type = '[DASHBOARD RESET] reset state to defaults';
}

export class LoadUserOwenedBanksAction {
    static readonly type = '[DASHBOARD LOAD] load user owened assets';
}

export class AttachBankAction {
    static readonly type = '[DASHBOARD ATTACH] attach new created bank';
    constructor(public payload: Bank) { }
}