import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../dashboard.service';
import { first, map, delay, tap, retry } from 'rxjs/operators';
import { User } from 'src/app/models/user';

interface UserBank {
  uid: string,
  email: string,
  photoURL: string,
  id: string,
  balance: number
}

@Injectable()
export class LocalDashboardService extends DashboardService {

  constructor(private http: HttpClient) {
    super();
  }

  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(uid: string): Observable<Bank[]> {
    const params = new HttpParams().set('userid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/mybanks`, { params }).pipe(
      first()
      , delay(500)
      , tap(_ => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong!');
        }
      }));
  }
  getMyOtherBanks(uid: string): Observable<Bank[]> {
    const params = new HttpParams().set('userid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/otherbanks`, { params }).pipe(
      first()
      , delay(500)
      , tap(() => {
        if (new Date().getTime() % 3 === 0) {
          throw new Error('sorry something went wrong!');
        }
      })
    );
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
