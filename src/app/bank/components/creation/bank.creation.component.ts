import { Component } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, retry } from 'rxjs/operators';
import { CreateBankHistory } from 'src/app/models/actions/create-bank';
import { SetOwnerHistory } from 'src/app/models/actions/set-owner';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToBankDetailsAction, RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { AddNewHistoryAction, ResetStateAction, SaveNewUserBankAction, SaveNewUserBankFailEvent, SaveNewUserBankSuccessEvent } from '../../state/actions';
import { BankState } from '../../state/bank.state';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {


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
            members: []
        } as Bank;
        this.store.dispatch(new ResetStateAction);
    }

    back() {
        this.store.dispatch(new RedirectToDashboardAction);
    }

    save() {

        // save new user database
        this.store.dispatch([
            new SaveNewUserBankAction(this.bank)
        ]).pipe(
            first()
            , retry(3)
        ).subscribe(_ => {
            this.store.dispatch([
                new AddNewHistoryAction(this.store.selectSnapshot(BankState.currentBank).id, new CreateBankHistory(this.bank.owner))
                , new AddNewHistoryAction(this.store.selectSnapshot(BankState.currentBank).id, new SetOwnerHistory(this.bank.owner))
                , new SaveNewUserBankSuccessEvent(this.store.selectSnapshot(BankState.currentBank))
                , new RedirectToBankDetailsAction])
        }, err => {
            this.store.dispatch(new SaveNewUserBankFailEvent(err));




            // this.store.dispatch([
            //     new AttachBankAction({ ...this.bank })
            //     , new SaveNewBankAction(this.bank)
            // ]);
            // this.actions.pipe(
            //     ofActionSuccessful(SuccessSaveNewBankEvent)
            //     , first()
            // ).subscribe(_ => {
            //     this.store.dispatch(new AddNewOwnerAction);
            // });
            // this.actions.pipe(
            //     ofActionSuccessful(AddNewOwnerActionSuccessEvent)
            //     , first()
            // ).subscribe(_ => {
            //     this.store.dispatch([
            //         new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, new CreateBankHistory(this.store.selectSnapshot(AppState.currentUser)))
            //         , new AddNewHistoryAction(this.store.selectSnapshot(AppState.currentBank).id, new SetOwnerHistory(this.store.selectSnapshot(AppState.currentUser)))])
            //         .pipe(first()).subscribe(_ => this.store.dispatch(new RedirectToBankDetailsAction));
        })
    }
}