import { Injectable } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from 'src/app/models/bank';
import { Action } from 'src/app/models/action';
import { HttpClient } from '@angular/common/http';
import { first, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LocalBankService extends BankService {


    constructor(private http: HttpClient) { super() }

    createNewBank(bank: Bank) {
        throw new Error('Method not implemented.');
    }
    deposit(deposit: Action) {
        throw new Error('Method not implemented.');
    }
    getBankDetails(id: string, userid: string) {
        return this.http.get<Bank>('./mockdata/banks.json').pipe(
            first()
            , concatMap(res => of(res))
        );
    }
    updateMyBank(bank: Bank) {
        throw new Error('Method not implemented.');
    }
    payOff(payment: Action) {
        throw new Error('Method not implemented.');
    }

}