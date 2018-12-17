import { Token } from 'src/app/models/token';

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

export class AddMemberAction {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER]';
    constructor(public payload: Token) { }
}
export class AddMemberSuccessfulEvent {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER]';
    constructor(public payload: string) { }
}
export class AddMemberFailEvent {
    static readonly type = '[INVITE MODULE - ADD USER AS MEMBER]';
    constructor(public payload: Error) { }
}