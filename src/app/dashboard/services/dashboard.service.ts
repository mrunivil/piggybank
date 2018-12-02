import { Observable } from 'rxjs';
import { Payment } from '../../models/actions/payment';
import { Action } from '../../models/action';
import { Injectable } from '@angular/core';
import { Bank } from 'src/app/models/bank';

export interface DashboardServiceInterface {
    sendInviteLink(bank: Bank): Observable<string>;

    getMyOwenedBanks(uid: string): Observable<Bank[]>;

    getMyOtherBanks(uid: string): Observable<Bank[]>;

    deleteBank(bank: Bank): Observable<boolean>;
}


@Injectable()
export abstract class DashboardService implements DashboardServiceInterface {
    abstract sendInviteLink(bank: Bank);

    abstract getMyOwenedBanks(uid: string): Observable<Bank[]>;

    abstract getMyOtherBanks(uid: string): Observable<Bank[]>;

    abstract deleteBank(bank: Bank);
}