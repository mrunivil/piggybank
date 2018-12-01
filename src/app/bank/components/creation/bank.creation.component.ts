import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/shared/state/app.state';
import { SaveNewBankAction } from '../../state/actions';
import { catchError } from 'rxjs/operators';
import { AttachBankAction } from 'src/app/dashboard/state/actions';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {


    user: User;
    bank: Bank;
    error: string;

    constructor(private store: Store) {
        this.user = this.store.selectSnapshot(AppState.currentUser);
        this.bank = { name: 'meine Bank', owner: this.user, photoURL: this.user.photoURL, balance: 0, paypal_account: this.user.email } as Bank;
    }

    save() {
        this.store.dispatch(new SaveNewBankAction(this.bank)).subscribe(ret => {
            this.store.dispatch(new RedirectToDashboardAction);
        }, err => {
            this.error = err;
        });
    }
}