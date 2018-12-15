import { User } from '../user';
import { BalanceChange } from './balance-change';
import { History } from '../action';

export class Payment extends BalanceChange {
    constructor(user: User, amount: number, comment?: string) {
        super(user, amount < 0 ? amount : -amount, History.TYPE_PAYMENT, comment);
    }
}
