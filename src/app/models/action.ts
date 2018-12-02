import { User } from './user';

export abstract class Action {
    user: User;
    date: Date;
    readonly type: string;
    constructor(user: User, date: Date, type: string) {
        this.user = user;
        this.date = date;
        this.type = type;
    }
}
