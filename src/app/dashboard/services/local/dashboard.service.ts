import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../dashboard.service';
import { first, map, delay, tap, retry } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable()
export class LocalDashboardService extends DashboardService {

  constructor(private http: HttpClient) {
    super();
  }

  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(uid: string): Observable<Bank[]> {
    return this.http.get<Bank[]>('./mockdata/banks.json').pipe(
      first()
      , delay(500)
      , tap(() => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong!');
        }
      })
      , map((banks: Bank[]) => {
        return banks.filter(b => b.owner.uid === uid);
      }));
  }
  getMyOtherBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
