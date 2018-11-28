import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getMyOwenedBanks(): Observable<Bank[]> {
    console.log('requesting data');
    return this.http.get<Bank[]>('./mockdata/banks.json');
  }
  getMyOtherBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
