import { Injectable } from '@angular/core';
import { InviteService } from '../invite.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment.prod';
import { tap, map } from 'rxjs/operators';

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

    addMember() {

    }

    removeToken() {

    }



}