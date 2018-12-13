import { Action } from '../action';
import { User } from '../user';

export abstract class BalanceChange extends Action {
    amount: number;
    constructor(user: User, amount: number, type: string, comment?: string) {
        super(user, type, comment);
        this.amount = amount;
    }
}