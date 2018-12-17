import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface InviteServiceInterface {


}

@Injectable()
export abstract class InviteService implements InviteServiceInterface {
    protected endpoint = environment.endpoint;
}
