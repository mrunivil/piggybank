import { Bank } from 'src/app/models/bank';
import { Observable } from 'rxjs';
import { History } from 'src/app/models/action';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';

export interface BankServiceInterface {
    getBankDetails(id: string): Observable<Bank[]>;

    createNewBank(bank: Bank): Observable<Bank>;

    updateMyBank(bank: Bank): Observable<Bank>;

    setOwner(bank: Bank, owner: User): Observable<Bank>;

    addHistory(id: string, action: History): Observable<History>

    getHistory(id: string): Observable<History[]>;

    invite(token: Token): Observable<Token>;
}

export abstract class BankService implements BankServiceInterface {
    protected endpoint = environment.endpoint;

    abstract getBankDetails(id: string): Observable<Bank[]>;

    abstract createNewBank(bank: Bank): Observable<Bank>;

    abstract updateMyBank(bank: Bank): Observable<Bank>;

    abstract setOwner(bank: Bank, owner: User): Observable<Bank>;

    abstract addHistory(id: string, action: History): Observable<History>;

    abstract getHistory(id: string): Observable<History[]>;

    abstract invite(token: Token): Observable<Token>;

    protected create_UUID() {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}