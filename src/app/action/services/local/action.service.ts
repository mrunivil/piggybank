import { ActionService } from '../action.service';
import { BalanceChange } from 'src/app/models/actions/balance-change';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export class LocalActionService extends ActionService {

    saveBalanceChage(change: BalanceChange): Observable<BalanceChange> {
        return of(change).pipe(delay(1000), tap((e: BalanceChange) => {
            if (new Date().getTime() % 3 === 0) {
                throw new Error('sorry something went wrong!');
            } else {
                e = { ...e, id: '10' };
                return of(e);
            }
        }));
    }

}