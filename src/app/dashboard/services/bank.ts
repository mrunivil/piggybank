import { Observable } from 'rxjs';
import { Payment } from '../../models/actions/payment';
import { Action } from '../../models/action';

export interface Bank {
    sendInviteLink(bank: Bank): Observable<string>;

    getMyBanks(): Observable<Bank[]>;

    createNewBank(bank: Bank): Observable<Bank>;

    deleteBank(bank: Bank): Observable<boolean>;

    updateMyBank(bank: Bank): Observable<Bank>;

    payOff(payment: Action): Observable<boolean>;

    deposit(deposit: Action): Observable<boolean>;
}
