import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { environment } from 'src/environments/environment';

export interface DashboardServiceInterface {
  sendInviteLink(bank: Bank): Observable<string>;

  getMyOwenedBanks(uid: string): Observable<Bank[]>;

  getMyOtherBanks(uid: string): Observable<Bank[]>;

  deleteBank(bank: Bank): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class DashboardService implements DashboardServiceInterface {
  protected endpoint = environment.endpoint;

  abstract sendInviteLink(bank: Bank);

  abstract getMyOwenedBanks(uid: string): Observable<Bank[]>;

  abstract getMyOtherBanks(uid: string): Observable<Bank[]>;

  abstract deleteBank(bank: Bank);
}
