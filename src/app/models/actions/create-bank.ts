import { Action } from '../action';
import { User } from '../user';

export class CreateBankHistoryAction extends Action {
    constructor(user: User) {
        super(user, Action.TYPE_BANK_CREATED);
    }
}
