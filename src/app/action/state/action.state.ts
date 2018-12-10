import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { SaveBalanceChangeAction, SaveBalanceChangeSuccessEvent, SaveBalanceChangeFailEvent } from './actions';
import { ActionService } from '../services/action.service';
import { first } from 'rxjs/operators';

export class ActionStateModel {
    initialized: boolean;
    error: string;
    success?: boolean;
}

@State<ActionStateModel>({
    name: 'action',
    defaults: {
        initialized: false,
        error: null,
    }
})
export class ActionState {

    @Selector()
    static error({ error }: ActionStateModel) {
        return error;
    }
    @Selector()
    static success({ success }: ActionStateModel) {
        return success;
    }

    constructor(private store: Store, private service: ActionService) { }

    @Action(SaveBalanceChangeAction)
    saveBalanceChange({ dispatch }: StateContext<ActionStateModel>, { payload }: SaveBalanceChangeAction) {
        this.service.saveBalanceChage(payload).pipe(first()).subscribe(res => {
            dispatch(new SaveBalanceChangeSuccessEvent(res));
        }, (err) => {
            dispatch(new SaveBalanceChangeFailEvent(err));
        });
    }

    @Action(SaveBalanceChangeSuccessEvent)
    saveBalanceChangeFailed({ patchState }: StateContext<ActionStateModel>) {
        patchState({ success: true });
    }
    @Action(SaveBalanceChangeFailEvent)
    saveBalanceChangeSuccess({ patchState }: StateContext<ActionStateModel>, { payload }: SaveBalanceChangeFailEvent) {
        patchState({ error: payload });
    }
}