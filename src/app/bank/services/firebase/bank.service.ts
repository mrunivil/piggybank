import { AngularFirestore } from '@angular/fire/firestore';
import { Token } from './../../../models/token';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { History } from 'src/app/models/action';
import { Bank } from 'src/app/models/bank';
import { BankService } from '../bank.service';
import { User } from 'src/app/models/user';
import { defineBase } from '@angular/core/src/render3';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class FirebaseBankService extends BankService {
  constructor(private db: AngularFirestore) {
    super();
  }
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



  createNewBank(bank: Bank): Observable<Bank> {
    return from(this.db.collection('user-banks').add({
      owner: bank.owner.uid,
      balance: bank.balance || 0,
      name: bank.name,
      members: [],
      actions: [],
      photoURL: bank.photoURL || null,
      token: []
    })).pipe(
      switchMap(doc => of({ ...bank, id: doc.id }))
    );
  }
  updateMyBank(bank: Bank): Observable<Bank> {
    throw new Error('Method not implemented.');
  }
  newAction(id: string, action: History) {
    throw new Error('Method not implemented.');
  }
}
