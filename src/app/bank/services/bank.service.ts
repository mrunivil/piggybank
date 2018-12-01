import { Bank } from 'src/app/models/bank';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';

export interface BankServiceInterface {
    getBankDetails(id: string, userid: string): Observable<Bank>;

    createNewBank(bank: Bank): Observable<Bank>;

    updateMyBank(bank: Bank): Observable<Bank>;

    payOff(payment: Action): Observable<boolean>;

    deposit(deposit: Action): Observable<boolean>;
}

export abstract class BankService implements BankServiceInterface {
    abstract getBankDetails(id: string, userid: string): Observable<Bank>;

    abstract createNewBank(bank: Bank): Observable<Bank>;

    abstract updateMyBank(bank: Bank): Observable<Bank>;

    abstract payOff(payment: Action);

    abstract deposit(deposit: Action);
}