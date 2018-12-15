import { History } from '../action';
import { User } from '../user';

export class CreateBankHistory extends History {
    constructor(user: User) {
        super(user, History.TYPE_BANK_CREATED);
    }
}
