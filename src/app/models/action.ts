import { User } from './user';

export abstract class Action {

    static TYPE_PAYMENT: string = 'Auszahlung';
    static TYPE_DEPOSIT: string = 'Einzahlung';
    static TYPE_OWNER: string = 'Besitzer geändert';
    static TYPE_BANK_CREATED: string = 'Bank erstellt';

    readonly id?: string;
    user: User;
    date: Date;
    comment: string;
    readonly type: string;
    constructor(user: User, type: string, comment?: string) {
        this.user = user;
        this.date = new Date();
        this.type = type;
        this.comment = comment || `${type} am ${this.date.toLocaleDateString()}`;
    }
}
