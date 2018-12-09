import { State } from '@ngxs/store';

export class ActionStateModel {
    initialized: boolean;
    error: string;
}

@State<ActionStateModel>({
    name: 'action',
    defaults: {
        initialized: false,
        error: null,
    }
})
export class ActionState {
}