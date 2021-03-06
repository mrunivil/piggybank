import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';


/**
 * Loading banks owned by logged in user
 */
export class LoadUserOwnedBanksAction {
    static readonly type = '[DASHBOARD LOAD] load user owened assets';
    constructor(public payload: User, public force?: boolean) { }
}
export class LoadUserOwnedBanksSuccessEvent {
    static readonly type = '[DASHBOARD LOAD] success load owners banks';
    constructor(public payload: Bank[]) { }
}
export class LoadUserOwnedBanksFailEvent {
    static readonly type = '[DASHBOARD LOAD] failed load owners banks';
    constructor(public payload: Error) { }
}
/**
 * Loading banks owned by others and logged in user is member
 */
export class LoadMemberBanksAction {
    static readonly type = '[DASHBOARD LOAD] load banks for member';
    constructor(public payload: User) { }
}
export class LoadMemberBanksSuccessEvent {
    static readonly type = '[DASHBOARD LOAD] success load members banks';
    constructor(public payload: Bank[]) { }
}
export class LoadMemberBanksFailEvent {
    static readonly type = '[DASHBOARD LOAD] failed  load members banks';
    constructor(public payload: Error) { }
}
