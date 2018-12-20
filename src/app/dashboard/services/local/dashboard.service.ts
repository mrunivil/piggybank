import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, flatMap, reduce, tap } from 'rxjs/operators';
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
    return this.http.get<Bank[]>(`${this.endpoint}/user_banks`, { params });
  }
  getMyOtherBanks(uid: string): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.endpoint}/user_banks`).pipe(
      flatMap(v1 => {
        return v1;
      }),
      filter(bank => {
        return bank.members.filter(member => {
          return member.uid === uid;
        }).length > 0;
      }),
      reduce((acc: Bank[], val: Bank, index: number) => {
        acc.push(val);
        return acc;
      }, []),
      tap(console.dir)
    );
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
