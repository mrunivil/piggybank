import { State } from '@ngxs/store';

export class InviteStateModel {
    initialized: boolean;
}

@State<InviteStateModel>({
    name: 'invite',
    defaults: {
        initialized: false
    }
})
export class InviteState {
    constructor() { }
}
