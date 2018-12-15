import { Bank } from 'src/app/models/bank';
import { Observable } from 'rxjs';
import { History } from 'src/app/models/action';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

export interface BankServiceInterface {
    getBankDetails(id: string): Observable<Bank[]>;

    createNewBank(bank: Bank): Observable<Bank>;

    updateMyBank(bank: Bank): Observable<Bank>;

    setOwner(bank: Bank, owner: User): Observable<Bank>;

    addHistory(id: string, action: History): Observable<History>

    getHistory(id: string): Observable<History[]>;
}

export abstract class BankService implements BankServiceInterface {
    protected endpoint = environment.endpoint;

    abstract getBankDetails(id: string): Observable<Bank[]>;

    abstract createNewBank(bank: Bank): Observable<Bank>;

    abstract updateMyBank(bank: Bank): Observable<Bank>;

    abstract setOwner(bank: Bank, owner: User): Observable<Bank>;

    abstract addHistory(id: string, action: History): Observable<History>;

    abstract getHistory(id: string): Observable<History[]>;
}