import { Component } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Deposit } from 'src/app/models/actions/deposit';
import { Payment } from 'src/app/models/actions/payment';
import { AppState } from 'src/app/shared/state/app.state';
import { AddNewHistoryAction, UpdateUserBankSuccessEvent, UpdateUserBankAction } from '../../state/actions';
import { first } from 'rxjs/operators';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { LoadUserOwnedBanksAction } from 'src/app/dashboard/state/actions';

@Component({
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {


    action: BalanceChange;

    constructor(private store: Store, private actions: Actions) {
        this.action = new Deposit(this.store.selectSnapshot(AppState.currentUser), 0);
    }

    onSelectionChanged(type: string) {
        switch (type) {
            case 'deposit':
                this.action = new Deposit(this.action.user, this.action.amount, this.action.comment.replace('Auszahlung', 'Einzahlung'));
                break;
            case 'payment':
                this.action = new Payment(this.action.user, this.action.amount, this.action.comment.replace('Einzahlung', 'Auszahlung'));
                break;
            default:
                throw new Error(`unknown action type ${type}`);
        }
    }

    save(): void {
        let amount = { ...this.action }.amount;
        if (this.action instanceof Payment && this.action.amount > 0) {
            amount = -amount;
        } else if (this.action instanceof Deposit && this.action.amount < 0) {
            amount = -amount;
        }
        this.store.dispatch(new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, { ...this.action, amount: amount })).pipe(
            first()
        ).subscribe();
        this.actions.pipe(
            ofActionSuccessful(UpdateUserBankSuccessEvent)
            , first()
        ).subscribe(_ => {
            this.store.dispatch([new LoadUserOwnedBanksAction(this.store.selectSnapshot(AppState.currentUser), true), new RedirectToBankDetailsAction]);
        });
    }
}