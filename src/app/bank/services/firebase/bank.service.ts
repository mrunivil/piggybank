import { Injectable } from '@angular/core';
import { Action } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseBankService extends BankService {

    constructor() { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    deposit(deposit: Action) {
        throw new Error('Method not implemented.');
    }
    getBankDetails(id: string, userid: string): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    updateMyBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    payOff(payment: Action) {
        throw new Error('Method not implemented.');
    }

}