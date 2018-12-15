import { Component, Input } from '@angular/core';
import { History } from 'src/app/models/action';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    @Input() history: History;
    @Input() onlyBalanceChanges: boolean;

    show() {
        if (this.onlyBalanceChanges) {
            return this.history instanceof BalanceChange;
        } else {
            return true;
        }
    }
}