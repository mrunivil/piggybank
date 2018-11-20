import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBankService extends BankService {
  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  getMyOtherBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  getBankDetails(bank: Bank): Observable<Bank> {
    throw new Error('Method not implemented.');
  }
  createNewBank(bank: Bank): Observable<Bank> {
    throw new Error('Method not implemented.');
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  updateMyBank(bank: Bank): Observable<Bank> {
    throw new Error('Method not implemented.');
  }
  payOff(payment: Action): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  deposit(deposit: Action): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
