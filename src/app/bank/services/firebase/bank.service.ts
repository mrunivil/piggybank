import { Token } from './../../../models/token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { User } from 'src/app/models/user';

@Injectable()
export class FirebaseBankService extends BankService {
  getMembers(id: string): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  invite(token: Token): Observable<Token> {
    throw new Error('Method not implemented.');
  }

  getHistory(id: string): Observable<History[]> {
    throw new Error('Method not implemented.');
  }
  addHistory(id: string, action: History): Observable<History> {
    throw new Error('Method not implemented.');
  }
  setOwner(bank: Bank, owner: User): Observable<Bank> {
    throw new Error('Method not implemented.');
  }

  constructor() {
    super();
  }

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
