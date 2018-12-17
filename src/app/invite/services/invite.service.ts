import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/models/token';

export interface InviteServiceInterface {
    checkToken(uid: string): Observable<Token>;
}

@Injectable()
export abstract class InviteService implements InviteServiceInterface {
    protected endpoint = environment.endpoint;
    abstract checkToken(uid: string): Observable<Token>;
}
