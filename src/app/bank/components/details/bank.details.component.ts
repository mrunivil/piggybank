import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { RedirectToAction, RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadBankHistoryAction, ResetStateAction, ToggleHistoryDteailsAction } from '../../state/actions';
import { BankState } from '../../state/bank.state';

@Component({
    selector: 'app-bank-details',
    templateUrl: './bank.details.component.html',
    styleUrls: ['./bank.details.component.scss']
})
export class BankDetailsComponent implements OnInit {

    @Select(AppState.currentBank) currentBank$: Observable<Bank>;
    @Select(BankState.onlyBalanceChanges) onlyBalanceChanges$: Observable<boolean>;
    @Select(BankState.history) history$: Observable<History[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch([
            new ResetStateAction
            , new LoadBankHistoryAction(this.store.selectSnapshot(AppState.currentBank).id)
        ]);
    }

    back() {
        return new RedirectToDashboardAction;
    }

    showHistory() {
        this.store.dispatch(new ToggleHistoryDteailsAction);
    }

    newAction() {
        this.store.dispatch(new RedirectToAction);
    }

}
