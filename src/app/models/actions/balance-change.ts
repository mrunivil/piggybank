import { Action } from '../action';
import { User } from '../user';

export abstract class BalanceChange extends Action {
    amount: number;
    constructor(user: User, amount: number, date: Date, type: string) {
        super(user, date, type);
        this.amount = amount;
    }
}