import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { BankService } from '../bank.service';



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
        return this.http.put<Bank>(`${this.endpoint}/user_banks/${bank.id}`, bank, { headers: headers }).pipe(
            delay(Math.floor(Math.random() * 200) + 300)
        );
    }

    getMembers(id: string): Observable<User[]> {
        const params = new HttpParams()
            .append('bankid', id)
        return this.http.get<Bank[]>(`${this.endpoint}/bank_users`).pipe(
            map(res => {
                if (res.length === 0) {
                    throw new Error('Die Piggy Bank konnte nicht gefunden werden');
                } else if (res.length > 1) {
                    throw new Error('Es wurde mehr als eine Piggy Bank gefunden');
                } else {
                    return res.pop();
                }
            })
            , map((bank: Bank) => bank.members)
        )
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

    addHistory(bank_id: string, { user, comment, date, id, type, amount }: History): Observable<History> {
        return this.http.post<History>(`${this.endpoint}/bank_history`, { bank_id: bank_id, user, comment, type, date, id, amount });
    }

    getHistory(id: string): Observable<History[]> {
        const params = new HttpParams()
            .set('bank_id', id);
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        return this.http.get<History[]>(`${this.endpoint}/bank_history`, { headers, params });
    }

    invite(token: Token): Observable<Token> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        token.uid = this.create_UUID();
        token.valid = new Date();
        token.valid.setTime(token.valid.getTime() + 1000 * 60 * 60);
        token.target = `http://localhost:4200/invite?token=${token.uid}`;
        return this.http.post<Token>(`${this.endpoint}/token`, token, { headers });
    }
}