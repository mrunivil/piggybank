import { User } from './user';

export abstract class Action {

    static TYPE_PAYMENT: string = 'Auszahlung';
    static TYPE_DEPOSIT: string = 'Einzahlung';

    readonly id?: string;
    user: User;
    date: Date;
    comment: string;
    readonly type: string;
    constructor(user: User, date: Date, type: string, comment?: string) {
        this.user = user;
        this.date = date;
        this.type = type;
        this.comment = comment || `${type} am ${date.toLocaleDateString()}`;
    }
}
