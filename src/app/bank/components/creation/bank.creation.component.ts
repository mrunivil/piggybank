import { Component } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concat, first } from 'rxjs/operators';
import { AttachBankAction } from 'src/app/dashboard/state/actions';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankDetailsAction, BankSelectionChangedEvent } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { ResetStateAction, SaveNewBankAction, SuccessSaveNewBankEvent, AddNewOwnerAction, AddNewHistoryAction, AddNewOwnerActionSuccessEvent } from '../../state/actions';
import { BankState } from '../../state/bank.state';
import { CreateBankHistoryAction } from 'src/app/models/actions/create-bank';
import { SetOwnerHistoryAction } from 'src/app/models/actions/set-owner';
import { dispatch } from 'rxjs/internal/observable/range';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {

    @Select(BankState.error) error$: Observable<string>;

    user: User;
    bank: Bank;

    constructor(public store: Store, private actions: Actions) {
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
        this.store.dispatch([
            new AttachBankAction({ ...this.bank })
            , new SaveNewBankAction(this.bank)
        ]);
        this.actions.pipe(
            ofActionSuccessful(SuccessSaveNewBankEvent)
            , first()
        ).subscribe(_ => {
            this.store.dispatch(new AddNewOwnerAction);
        });
        this.actions.pipe(
            ofActionSuccessful(AddNewOwnerActionSuccessEvent)
            , first()
        ).subscribe(_ => {
            this.store.dispatch([
                new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, new CreateBankHistoryAction(this.store.selectSnapshot(AppState.currentUser)))
                , new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, new SetOwnerHistoryAction(this.store.selectSnapshot(AppState.currentUser)))])
                .pipe(first()).subscribe(_ => this.store.dispatch(new RedirectToBankDetailsAction));
        })
    }
}