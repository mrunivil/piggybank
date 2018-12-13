import { Action } from '../action';
import { User } from '../user';

export class SetOwnerHistoryAction extends Action {
    constructor(user: User) {
        super(user, Action.TYPE_OWNER);
    }
}