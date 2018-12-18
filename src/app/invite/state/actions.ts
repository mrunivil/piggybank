import { Token } from 'src/app/models/token';
import { Bank } from 'src/app/models/bank';

export class CheckTokenAction {
    static readonly type = '[INVITE MODULE - CHECK TOKEN]';
    constructor(public payload: string) { }
}
export class CheckTokenSuccessfulEvent {
    static readonly type = '[INVITE MODULE - CHECK TOKEN SUCCESSFUL]';
    constructor(public payload: Token) { }
}
export class CheckTokenFailEvent {
    static readonly type = '[INVITE MODULE - CHECK TOKEN FAIL]';
    constructor(public payload: Error) { }
}

export class DeleteTokenAction {
    static readonly type = '[INVITE MODULE - DELETE USED TOKEN]';
}

export class AddMemberAction {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER]';
}
export class AddMemberSuccessfulEvent {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER SUCCESSFULL]';
    constructor(public payload: Bank) { }
}
export class AddMemberFailEvent {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER FAIL]';
    constructor(public payload: Error) { }
}