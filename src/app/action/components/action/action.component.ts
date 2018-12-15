import { Component } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UpdateBankAction, UpdateBankSuccessEvent } from 'src/app/bank/state/actions';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Deposit } from 'src/app/models/actions/deposit';
import { Payment } from 'src/app/models/actions/payment';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { ActionState } from '../../state/action.state';
import { SaveBalanceChangeAction } from '../../state/actions';

@Component({
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {

    @Select(ActionState.error) error$: Observable<string>;
    @Select(ActionState.success) success$: Observable<boolean>;

    action: BalanceChange;

    constructor(private store: Store, private actions: Actions) {
        this.action = new Deposit(this.store.selectSnapshot(AppState.currentUser), 0);
    }

    onSelectionChanged(type: string) {
        switch (type) {
            case 'deposit':
                this.action = new Deposit(this.action.user, this.action.amount, this.action.comment);
                break;
            case 'payment':
                this.action = new Payment(this.action.user, this.action.amount, this.action.comment)
                break;
            default:
                throw new Error(`unknown action type ${type}`);
        }
    }

    save(): void {
        // this.store.dispatch(new SaveBalanceChangeAction(this.action));
        // this.actions.pipe(
        //     ofActionSuccessful(AddNewHistoryActionSuccessEvent)
        //     , first()
        // ).subscribe(_ => {
        //     this.store.dispatch(new UpdateBankAction(this.store.selectSnapshot(AppState.currentBank)));
        // });
        // this.actions.pipe(
        //     ofActionSuccessful(UpdateBankSuccessEvent)
        //     , first()
        // ).subscribe(_ => {
        //     this.store.dispatch(new RedirectToBankDetailsAction);
        // })
    }
}