import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, switchMap, tap } from 'rxjs/operators';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { User } from 'src/app/models/user';



@Injectable()
export class LocalBankService extends BankService {

    constructor(private http: HttpClient) { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        return this.http.post<Bank>(`${this.endpoint}/user_banks`, bank).pipe(
            delay(Math.floor(Math.random() * 200) + 300)
        );
    }

    updateMyBank(bank: Bank): Observable<Bank> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        return this.http.put<Bank>(`${this.endpoint}/banks/${bank.id}`, bank, { headers: headers }).pipe(
            delay(Math.floor(Math.random() * 200) + 300)
        );
    }

    getBankDetails(id: string): Observable<Bank[]> {
        const params = new HttpParams()
            .set('id', id);
        return this.http.get<Bank[]>(`${this.endpoint}/banks`, { params }).pipe(
            first()
            , delay(500)
        );
    }

    setOwner(bank: Bank, owner: User): Observable<Bank> {
        return this.http.put<Bank>(`${this.endpoint}/user_banks/${bank.id}`, {
            owner: { uid: owner.uid }
            , id: bank.id
            , name: bank.name
            , balance: bank.balance
            , photoURL: bank.photoURL
        })
    }

    addHistory(bank_id: string, { user, comment, date, id, type }: History): Observable<History> {
        return this.http.post<History>(`${this.endpoint}/bank_history`, { bank_id: bank_id, user, comment, type, date, id });
    }

    getHistory(id: string): Observable<History[]> {
        const params = new HttpParams()
            .set('bank_id', id);
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        return this.http.get<History[]>(`${this.endpoint}/bank_history`, { headers, params });
    }
}