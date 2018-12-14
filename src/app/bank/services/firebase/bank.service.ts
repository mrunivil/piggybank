import { Injectable } from '@angular/core';
import { Action } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseBankService extends BankService {
    getHistory(id: string): Observable<Action[]> {
        throw new Error('Method not implemented.');
    }
    addHistory(bank: Bank, action: Action): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    setOwner(bank: Bank, owner: import("d:/webprojects/PiggyBank/src/app/models/user").User): Observable<Bank> {
        throw new Error('Method not implemented.');
    }

    constructor() { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    getBankDetails(id: string): Observable<Bank[]> {
        throw new Error('Method not implemented.');
    }
    updateMyBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    newAction(id: string, action: Action) {
        throw new Error('Method not implemented.');
    }

}