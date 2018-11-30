import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-bank-creation',
    templateUrl: 'bank.creation.component.html',
    styleUrls: ['bank.creation.component.scss']
})
export class BankCreationComponent {

    constructor(store: Store) { }

}