import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';

export class SendUserFeedbackAction {
    static readonly type = '[FEEDBACK SEND] sending feedback';
    constructor(public payload: Feedback) { }
}
export class LoadUserFeedbackAction {
    static readonly type = '[FEEDBACK LOAD] loading user related feedback';
    constructor(public payload: User) { }
}
