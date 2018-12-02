import { Action } from '../action';
import { User } from '../user';

export class CreateBank implements Action {
    user: User;
    date: Date;
    readonly type: string = 'Bank erstellt';
    constructor(user: User, date: Date) {
        this.user = user;
        this.date = date;
    }
}
