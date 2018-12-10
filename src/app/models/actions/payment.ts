import { User } from '../user';
import { BalanceChange } from './balance-change';
import { Action } from '../action';

export class Payment extends BalanceChange {
    constructor(user: User, amount: number, date: Date, comment?: string) {
        super(user, amount, date, Action.TYPE_PAYMENT, comment);
    }
}
