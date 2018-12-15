import { History } from '../action';
import { User } from '../user';

export abstract class BalanceChange extends History {
    amount: number;
    constructor(user: User, amount: number, type: string, comment?: string) {
        super(user, type, comment, amount);
    }
}