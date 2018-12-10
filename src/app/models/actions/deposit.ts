import { Action } from '../action';
import { User } from '../user';
import { BalanceChange } from './balance-change';

export class Deposit extends BalanceChange {
    constructor(user: User, amount: number, date: Date, comment?: string) {
        super(user, amount, date, Action.TYPE_DEPOSIT, comment);
    }
}
