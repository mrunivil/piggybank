import { Component, Input } from '@angular/core';
import { Action } from 'src/app/models/action';
import { BalanceChange } from 'src/app/models/actions/balance-change';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    @Input() history: Action;
    @Input() onlyBalanceChanges: boolean;

    show() {
        if (this.onlyBalanceChanges && this.history) {
            return this.history instanceof BalanceChange;
        } else {
            return true;
        }
    }
}