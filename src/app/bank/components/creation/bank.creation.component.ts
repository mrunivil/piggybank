import { Component } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concat, first } from 'rxjs/operators';
import { AttachBankAction } from 'src/app/dashboard/state/actions';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { ResetStateAction, SaveNewBankAction, SuccessSaveNewBankEvent } from '../../state/actions';
import { BankState } from '../../state/bank.state';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {

    @Select(BankState.error) error$: Observable<string>;

    user: User;
    bank: Bank;

    constructor(public store: Store, private action: Actions) {
        this.user = this.store.selectSnapshot(AppState.currentUser);
        this.bank = {
            name: `${this.user.email}´s Bank`,
            owner: this.user,
            photoURL: this.user.photoURL,
            balance: 0,
            paypal_account: this.user.email,
            history: [],
            members: []
        } as Bank;
        this.store.dispatch(new ResetStateAction)
    }

    save() {
        this.store.dispatch(new SaveNewBankAction(this.bank));
        this.action.pipe(
            ofActionSuccessful(SuccessSaveNewBankEvent)
            , concat(this.store.dispatch(new AttachBankAction(this.store.selectSnapshot(AppState.currentBank))))
        ).subscribe(_ => this.store.dispatch(new RedirectToBankDetailsAction).pipe(first()).subscribe());
    }
}