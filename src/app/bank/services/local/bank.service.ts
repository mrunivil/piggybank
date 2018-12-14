import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, switchMap, tap } from 'rxjs/operators';
import { Action } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { User } from 'src/app/models/user';



@Injectable()
export class LocalBankService extends BankService {

    constructor(private http: HttpClient) { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        return this.http.post<Bank>(`${this.endpoint}/banks`, bank).pipe(
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
            , delay(500),
            tap(_ => {
                if (new Date().getTime() % 3 === 0) {
                    throw new Error('sorry something went wrong!');
                }
            })
        );
    }

    setOwner(bank: Bank, owner: User): Observable<Bank> {
        return this.http.post<Bank>(`${this.endpoint}/user_banks`, {
            owner: { uid: owner.uid }
            , id: bank.id
            , name: bank.name
            , balance: bank.balance
            , photoURL: bank.photoURL
        }).pipe(
            first()
            , delay(500)
        )
    }

    addHistory(bank: Bank, action: Action): Observable<Bank> {
        return this.http.post<Bank>(`${this.endpoint}/bank_history`, { bank: bank.id, history: action }).pipe(
            first()
            , delay(500)
        )
    }

}