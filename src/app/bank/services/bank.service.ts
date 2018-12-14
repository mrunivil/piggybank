import { Bank } from 'src/app/models/bank';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

export interface BankServiceInterface {
    getBankDetails(id: string): Observable<Bank[]>;

    createNewBank(bank: Bank): Observable<Bank>;

    updateMyBank(bank: Bank): Observable<Bank>;

    setOwner(bank: Bank, owner: User): Observable<Bank>;

    addHistory(bank: Bank, action: Action): Observable<Bank>

    getHistory(id: string): Observable<Action[]>;
}

export abstract class BankService implements BankServiceInterface {
    protected endpoint = environment.endpoint;

    abstract getBankDetails(id: string): Observable<Bank[]>;

    abstract createNewBank(bank: Bank): Observable<Bank>;

    abstract updateMyBank(bank: Bank): Observable<Bank>;

    abstract setOwner(bank: Bank, owner: User): Observable<Bank>;

    abstract addHistory(bank: Bank, action: Action): Observable<Bank>;

    abstract getHistory(id: string): Observable<Action[]>;
}