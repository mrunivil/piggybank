import { Action } from '../action';
import { User } from '../user';
import { BalanceChange } from './balance-change';

export class Deposit extends BalanceChange {
    constructor(user: User, amount: number, date: Date) {
        super(user, amount, date, 'Auszahlung');
    }
}
