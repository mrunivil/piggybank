import { User } from '../user';
import { BalanceChange } from './balance-change';
import { Action } from '../action';

export class Payment extends BalanceChange {
    constructor(user: User, amount: number, comment?: string) {
        super(user, amount, Action.TYPE_PAYMENT, comment);
    }
}
