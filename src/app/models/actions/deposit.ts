import { History } from '../action';
import { User } from '../user';
import { BalanceChange } from './balance-change';

export class Deposit extends BalanceChange {
    constructor(user: User, amount: number, comment?: string) {
        super(user, amount, History.TYPE_DEPOSIT, comment);
    }
}
