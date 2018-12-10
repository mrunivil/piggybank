import { Action } from '../action';
import { User } from '../user';

export abstract class BalanceChange extends Action {
    amount: number;
    constructor(user: User, amount: number, date: Date, type: string, comment?: string) {
        super(user, date, type, comment);
        this.amount = amount;
    }
}