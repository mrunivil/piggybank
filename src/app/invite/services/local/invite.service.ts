import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment.prod';
import { InviteService } from '../invite.service';

@Injectable()
export class LocalInviteService extends InviteService {

    constructor(private http: HttpClient) { super() }

    checkToken(uid: string): Observable<Token> {
        const p = new HttpParams().append('uid', uid);
        return this.http.get<Token[]>(`${environment.endpoint}/token`, { params: p }).pipe(
            tap((res: Array<Token>) => {
                if (res.length !== 1) {
                    throw new Error('Leider stimmt etwas mit deiner Einladung nicht. Lass dir bitte eine neue schicken');
                }
            })
            , tap((res: Array<Token>) => {
                const d1 = new Date(res[0].valid).getTime();
                const d2 = new Date().getTime();
                if (d1 < d2) {
                    throw new Error('Leider ist deine Einladung abgelaufen. Lass dir bitte eine neue schicken');
                }
            })
            , map(res => res.pop())
        )
    }

    deleteToken(token: Token): Observable<Token> {
        const params = new HttpParams().append('uid', token.uid);
        return this.http.delete<Token>(`${this.endpoint}/token/${token.id}`, { params })
    }

    checkBank(id: string): Observable<Bank> {
        const params = new HttpParams()
            .append('id', id);
        return this.http.get<Bank[]>(`${this.endpoint}/user_banks`, { params }).pipe(
            tap((res: Bank[]) => {
                if (res.length !== 1) {
                    throw new Error('Leider konnte die Datenbank nicht gefunden werden');
                }
            })
            , map(res => res.pop())
        )
    }

    addMember(bank: Bank): Observable<Bank> {
        return this.http.put<Bank>(`${this.endpoint}/user_banks/${bank.id}`, bank).pipe(delay(Math.floor(Math.random() * 200) + 300));
    }

    removeToken() {

    }



}