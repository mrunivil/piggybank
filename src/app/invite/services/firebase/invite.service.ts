import { InviteService } from '../invite.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';

@Injectable()
export class FirebaseInviteService extends InviteService {
    checkToken(uid: string): Observable<Token> {
        throw new Error('Not implemented yet');
    }

}