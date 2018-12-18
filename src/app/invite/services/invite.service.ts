import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/models/token';
import { Bank } from 'src/app/models/bank';

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
