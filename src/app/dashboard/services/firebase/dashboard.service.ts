import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { DashboardService } from '../dashboard.service';

export class FirebaseDashboardService extends DashboardService {
  sendInviteLink(bank: Bank): Observable<string> {
    throw new Error('Method not implemented.');
  }
  getMyOwenedBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  getMyOtherBanks(): Observable<Bank[]> {
    throw new Error('Method not implemented.');
  }
  deleteBank(bank: Bank): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
