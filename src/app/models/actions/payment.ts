import { User } from '../user';
import { BalanceChange } from './balance-change';

export class Payment extends BalanceChange {
    constructor(user: User, amount: number, date: Date) {
        super(user, amount, date, 'Auszahlung');
    }
}
