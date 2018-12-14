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
    const params = new HttpParams().set('uid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/user_banks`, { params });
  }
  getMyOtherBanks(uid: string): Observable<Bank[]> {
    const params = new HttpParams().set('uid', uid);
    return this.http.get<Bank[]>(`${this.endpoint}/bank_users`, { params });
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
