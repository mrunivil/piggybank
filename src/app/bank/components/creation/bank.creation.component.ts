import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, last, takeUntil, takeWhile } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { SaveNewBankAction } from '../../state/actions';
import { BankState } from '../../state/bank.state';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {

    @Select(BankState.currentBank) bank$: Observable<Bank>;
    @Select(BankState.error) error$: Observable<string>;
    @Select(BankState.success) success$: Observable<boolean>;

    user: User;
    bank: Bank;

    constructor(private store: Store) {
        this.user = this.store.selectSnapshot(AppState.currentUser);
        this.bank = { name: `${this.user.email}´s Bank`, owner: this.user, photoURL: this.user.photoURL, balance: 0, paypal_account: this.user.email } as Bank;
    }

    save() {
        this.store.dispatch(new SaveNewBankAction(this.bank));
        this.success$.pipe(takeWhile(res => res !== true)).subscribe((res) => { }, (err) => { }, () => {
            debugger
            const id = this.store.selectSnapshot(BankState.currentBank).id;
            this.store.dispatch(new RedirectToBankDetailsAction(id))
        });
    }
}