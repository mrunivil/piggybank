import { Observable } from 'rxjs';
import { Payment } from '../../models/actions/payment';
import { Action } from '../../models/action';
import { Injectable } from '@angular/core';

export interface Bank {
    sendInviteLink(bank: Bank): Observable<string>;

    getMyBanks(): Observable<Bank[]>;

    getBankDetails(bank: Bank): Observable<Bank>;

    createNewBank(bank: Bank): Observable<Bank>;

    deleteBank(bank: Bank): Observable<boolean>;

    updateMyBank(bank: Bank): Observable<Bank>;

    payOff(payment: Action): Observable<boolean>;

    deposit(deposit: Action): Observable<boolean>;
}


@Injectable()
export abstract class BankService implements Bank {
    abstract sendInviteLink(bank: Bank): Observable<string>;

    abstract getMyBanks(): Observable<Bank[]>;

    abstract getBankDetails(bank: Bank): Observable<Bank>;

    abstract createNewBank(bank: Bank): Observable<Bank>;

    abstract deleteBank(bank: Bank): Observable<boolean>;

    abstract updateMyBank(bank: Bank): Observable<Bank>;

    abstract payOff(payment: Action): Observable<boolean>;

    abstract deposit(deposit: Action): Observable<boolean>;
}