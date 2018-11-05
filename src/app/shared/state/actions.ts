import { User } from 'src/app/models/user';

export class ResetStateAction {
    static readonly type = '[APP RESET] reset state to defaults';
}

export class SetUserAction {
    static readonly type = '[APP SET USER] recieving user information';
    constructor(public payload: User) { }
}
