import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Deposit } from 'src/app/models/actions/deposit';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {

    action: BalanceChange;

    constructor(private store: Store) {
        this.action = new Deposit(this.store.selectSnapshot(AppState.currentUser), 0, new Date());
    }

    onSelectionChanged(type: string) {

    }

    save(): void {

    }
}