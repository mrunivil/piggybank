import { Action } from '../action';
import { User } from '../user';

export class CreateBank implements Action {
    user: User;
    date: Date;
    readonly type: string;
    constructor(user: User, date: Date) {
        debugger
        this.user = user;
        this.date = date;
        this.type = 'Bank erstellt';
    }
}
