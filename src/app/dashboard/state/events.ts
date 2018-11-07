import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';

export class DoLoadUserRelatedBanksEvent {
    static readonly type = '[BANK LOAD] loading';
}

export class DoneLoadUserRelatedBanksEvent {
    static readonly type = '[BANK LOAD] done loading';
}

export class ErrorLoadUserRelatedBanksEvent {
    static readonly type = '[BANK LOAD] error while loading';
}