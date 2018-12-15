import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import { AddNewHistoryAction } from 'src/app/bank/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { ActionService } from '../services/action.service';
import { SaveBalanceChangeAction, SaveBalanceChangeFailEvent, SaveBalanceChangeSuccessEvent } from './actions';

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

    constructor(private store: Store, private service: ActionService, private actions: Actions) { }

    @Action(SaveBalanceChangeAction)
    saveBalanceChange({ dispatch }: StateContext<ActionStateModel>, { payload }: SaveBalanceChangeAction) {
        dispatch(new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, payload));
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