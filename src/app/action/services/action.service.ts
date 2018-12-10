import { Injectable } from '@angular/core';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Observable } from 'rxjs';

export interface ActionServiceInterface {
    saveBalanceChage(payload: BalanceChange): Observable<BalanceChange>;
}

@Injectable()
export abstract class ActionService implements ActionServiceInterface {
    abstract saveBalanceChage(payload: BalanceChange): Observable<BalanceChange>;
}