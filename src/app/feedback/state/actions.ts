import { Feedback } from 'src/app/models/feedback';

export class SendFeedbackAction {
    static readonly type = '[FEEDBACK SEND] sending feedback';
    constructor(public payload: Feedback) { }
}

export class FeedbackSendSuccessfullEvent {
    static readonly type = '[FEEDBACK SEND] sending feedback successfull';
    constructor(public payload: Feedback) { }
}

export class FeedbackSendFailEvent {
    static readonly type = '[FEEDBACK SEND] sending feedback failed';
    constructor(public payload: string) { }
}