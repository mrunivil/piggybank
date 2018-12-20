import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';

export interface InviteServiceInterface {
    checkToken(uid: string): Observable<Token>;
    checkBank(id: string): Observable<Bank>;
    addMember(bank: Bank): Observable<Bank>;
    deleteToken(token: Token): Observable<Token>;
}

@Injectable()
export abstract class InviteService implements InviteServiceInterface {
    protected endpoint = environment.endpoint;
    abstract checkToken(uid: string): Observable<Token>;
    abstract checkBank(id: string): Observable<Bank>;
    abstract addMember(bank: Bank): Observable<Bank>;
    abstract deleteToken(token: Token): Observable<Token>;
}
