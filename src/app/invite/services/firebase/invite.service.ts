import { InviteService } from '../invite.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';

@Injectable()
export class FirebaseInviteService extends InviteService {
    deleteToken(token: Token): Observable<Token> {
        throw new Error('Method not implemented.');
    }
    addMember(bank: import("d:/webprojects/PiggyBank/src/app/models/bank").Bank): Observable<import("d:/webprojects/PiggyBank/src/app/models/bank").Bank> {
        throw new Error('Method not implemented.');
    }
    checkBank(id: string): Observable<import("d:/webprojects/PiggyBank/src/app/models/bank").Bank> {
        throw new Error('Method not implemented.');
    }
    checkToken(uid: string): Observable<Token> {
        throw new Error('Not implemented yet');
    }

}