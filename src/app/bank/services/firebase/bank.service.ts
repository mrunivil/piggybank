import { Injectable } from '@angular/core';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseBankService extends BankService {
    getMembers(id: string): Observable<import("d:/webprojects/PiggyBank/src/app/models/user").User[]> {
        throw new Error('Method not implemented.');
    }
    invite(token: import("d:/webprojects/PiggyBank/src/app/models/token").Token): Observable<import("d:/webprojects/PiggyBank/src/app/models/token").Token> {
        throw new Error('Method not implemented.');
    }


    getHistory(id: string): Observable<History[]> {
        throw new Error('Method not implemented.');
    }
    addHistory(id: string, action: History): Observable<History> {
        throw new Error('Method not implemented.');
    }
    setOwner(bank: Bank, owner: import("d:/webprojects/PiggyBank/src/app/models/user").User): Observable<Bank> {
        throw new Error('Method not implemented.');
    }

    constructor() { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    updateMyBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    newAction(id: string, action: History) {
        throw new Error('Method not implemented.');
    }

}