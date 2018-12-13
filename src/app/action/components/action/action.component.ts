import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Deposit } from 'src/app/models/actions/deposit';
import { Store, Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { Payment } from 'src/app/models/actions/payment';
import { SaveBalanceChangeAction } from '../../state/actions';
import { ActionState } from '../../state/action.state';
import { takeWhile } from 'rxjs/operators';
import { BankState } from 'src/app/bank/state/bank.state';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';

@Component({
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {

    @Select(ActionState.error) error$: Observable<string>;
    @Select(ActionState.success) success$: Observable<boolean>;

    action: BalanceChange;

    constructor(private store: Store) {
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
        this.store.dispatch(new SaveBalanceChangeAction(this.action));
        this.success$.pipe(takeWhile(res => res !== true)).subscribe(_ => { }, (err) => { }, () => {
            this.store.dispatch(new RedirectToBankDetailsAction);
        });
    }
}