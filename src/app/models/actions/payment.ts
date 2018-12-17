import { User } from '../user';
import { BalanceChange } from './balance-change';
import { History } from '../action';

export class Payment extends BalanceChange {
    constructor(user: User, amount: number, comment?: string) {
        super(user, amount, History.TYPE_PAYMENT, comment);
    }
}
