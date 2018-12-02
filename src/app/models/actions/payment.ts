import { Action } from '../action';
import { User } from '../user';

export class Payment implements Action {
    user: User;
    date: Date;
    amount: number;
    readonly type: string;
    constructor(user: User, amount: number, date: Date) {
        this.user = user;
        this.date = date;
        this.amount = amount;
        this.type = 'Einzahlung';
    }

}
