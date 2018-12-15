import { History } from '../action';
import { User } from '../user';

export class SetOwnerHistory extends History {
    constructor(user: User) {
        super(user, History.TYPE_OWNER);
    }
}