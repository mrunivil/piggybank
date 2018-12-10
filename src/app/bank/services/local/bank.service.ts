import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, map, tap } from 'rxjs/operators';
import { Action } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';



@Injectable()
export class LocalBankService extends BankService {

    constructor(private http: HttpClient) { super() }

    createNewBank(bank: Bank): Observable<Bank> {
        return this.http.post(`${this.endpoint}/banks`, bank).pipe(delay(1000), tap((e: Bank) => {
            if (new Date().getTime() % 3 === 0) {
                throw new Error('sorry something went wrong!');
            } else {
                return e;
            }
        }));
    }


    private $bank_cache: Map<string, Observable<Bank>>;
    getBankDetails(id: string, userid: string): Observable<Bank> {
        return this.http.get<Bank[]>('./mockdata/banks.json').pipe(
            first()
            , delay(500)
            , tap(() => {
                if (new Date().getTime() % 3 === 0) {
                    throw new Error('sorry something went wrong!');
                }
            })
            , map((banks: Bank[]) => {
                const bank = banks.filter(b => b.id === id);
                return bank.pop();
            })
        );
    }
    updateMyBank(bank: Bank): Observable<Bank> {
        throw new Error('Method not implemented.');
    }
    deposit(deposit: Action) {
        throw new Error('Method not implemented.');
    }
    payOff(payment: Action) {
        throw new Error('Method not implemented.');
    }

}