import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, pluck } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { LoadBankDetailsAction, ResetStateAction } from '../../state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { BankState } from '../../state/bank.state';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';

@Component({
    selector: 'app-bank-details',
    templateUrl: './bank.details.component.html',
    styleUrls: ['./bank.details.component.scss']
})
export class BankDetailsComponent implements OnInit {

    @Select(BankState.currentBank) $currentBank: Observable<Bank>;

    constructor(private route: ActivatedRoute, private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new ResetStateAction)
            .pipe(
                take(1)
            ).subscribe(() => {
                this.route.params.pipe(
                    take(1),
                    pluck('id')
                ).subscribe((bankid: string) => {
                    this.store.dispatch(new LoadBankDetailsAction(bankid, this.store.selectSnapshot(AppState.currentUser).uid));
                });
            });
    }

}
