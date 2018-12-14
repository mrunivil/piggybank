import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, pluck } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadBankDetailsAction, ResetStateAction, ToggleHistoryDteailsAction, LoadBankHistoryAction, SuccessLoadBankDetailsEvent } from '../../state/actions';
import { BankState } from '../../state/bank.state';
import { RedirectToAction } from 'src/app/shared/state/actions';

@Component({
    selector: 'app-bank-details',
    templateUrl: './bank.details.component.html',
    styleUrls: ['./bank.details.component.scss']
})
export class BankDetailsComponent implements OnInit {

    @Select(AppState.currentBank) currentBank$: Observable<Bank>;
    @Select(BankState.error) error$: Observable<string>;
    @Select(BankState.onlyBalanceChanges) onlyBalanceChanges$: Observable<boolean>;

    constructor(private route: ActivatedRoute, private store: Store, private actions: Actions) { }

    ngOnInit() {
        this.route.params.pipe(
            first(),
            pluck('id')
        ).subscribe((bankid: string) => {
            this.store.dispatch([
                new LoadBankDetailsAction(bankid)
            ])
            this.actions.pipe(
                ofActionSuccessful(SuccessLoadBankDetailsEvent)
                , first()
            ).subscribe(_ => {
                this.store.dispatch(new LoadBankHistoryAction(this.store.selectSnapshot(AppState.currentBank).id));
            })
        });
    }

    showHistory() {
        this.store.dispatch([new ToggleHistoryDteailsAction]);
    }

    newAction() {
        this.store.dispatch(new RedirectToAction);
    }

}
