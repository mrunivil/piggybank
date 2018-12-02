import { Action } from '../action';
import { User } from '../user';

export class CreateBank extends Action {
    constructor(user: User, date: Date) {
        super(user, date, 'Bank erstellt');
    }
}
