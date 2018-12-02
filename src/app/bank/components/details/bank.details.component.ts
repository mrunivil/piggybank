import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, pluck, take } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadBankDetailsAction, ResetStateAction } from '../../state/actions';
import { BankState } from '../../state/bank.state';

@Component({
    selector: 'app-bank-details',
    templateUrl: './bank.details.component.html',
    styleUrls: ['./bank.details.component.scss']
})
export class BankDetailsComponent implements OnInit {

    @Select(BankState.currentBank) currentBank$: Observable<Bank>;
    @Select(BankState.error) error$: Observable<string>;

    constructor(private route: ActivatedRoute, private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new ResetStateAction)
            .pipe(
                first()
            ).subscribe(() => {
                this.route.params.pipe(
                    first(),
                    pluck('id')
                ).subscribe((bankid: string) => {
                    this.store.dispatch(new LoadBankDetailsAction(bankid, this.store.selectSnapshot(AppState.currentUser).uid));
                });
            });
    }

    newAction() {
        throw new Error('create a new histry entry is not implemented yet');
    }
}
