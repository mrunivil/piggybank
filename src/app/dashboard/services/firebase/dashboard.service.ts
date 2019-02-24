import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseDashboardService extends DashboardService {
  constructor(private firestore: AngularFirestore) {
    super();
  }

  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(uid: string): Observable<Bank[]> {
    return this.firestore
      .collection<Bank>('user-banks', ref => ref.where('owner', '==', uid))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(change => {
            const ret = change.payload.doc.data();
            ret.id = change.payload.doc.id;
            return ret;
          });
        })
      );
  }
  getMyOtherBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
