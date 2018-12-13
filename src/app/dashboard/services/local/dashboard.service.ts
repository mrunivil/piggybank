import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../dashboard.service';

@Injectable()
export class LocalDashboardService extends DashboardService {

  constructor(private http: HttpClient) {
    super();
  }

  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(uid: string): Observable<Bank[]> {
    const params = new HttpParams().set('owner.uid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/user_banks`, { params }).pipe(
      first()
      , delay(500)
      , tap(_ => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong while loading owned banks!');
        }
      }));
  }
  getMyOtherBanks(uid: string): Observable<Bank[]> {
    const params = new HttpParams().set('userid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/bank_users`, { params }).pipe(
      first()
      , delay(500)
      , tap(() => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong while getting others banks!');
        }
      })
    );
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
