import { Observable } from 'rxjs';
import { Payment } from '../../models/actions/payment';
import { Action } from '../../models/action';
import { Injectable } from '@angular/core';
import { Bank } from 'src/app/models/bank';

export interface BankServiceInterface {
    sendInviteLink(bank: Bank): Observable<string>;

    getMyOwenedBanks(): Observable<Bank[]>;

    getMyOtherBanks(): Observable<Bank[]>;

    getBankDetails(bank: Bank): Observable<Bank>;

    createNewBank(bank: Bank): Observable<Bank>;

    deleteBank(bank: Bank): Observable<boolean>;

    updateMyBank(bank: Bank): Observable<Bank>;

    payOff(payment: Action): Observable<boolean>;

    deposit(deposit: Action): Observable<boolean>;
}


@Injectable()
export abstract class BankService implements BankServiceInterface {
    abstract sendInviteLink(bank: Bank);

    abstract getMyOwenedBanks(): Observable<Bank[]>;

    abstract getMyOtherBanks(): Observable<Bank[]>;

    abstract getBankDetails(bank: Bank);

    abstract createNewBank(bank: Bank);

    abstract deleteBank(bank: Bank);

    abstract updateMyBank(bank: Bank);

    abstract payOff(payment: Action);

    abstract deposit(deposit: Action);
}