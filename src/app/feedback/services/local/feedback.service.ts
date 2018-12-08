import { FeedbackService } from '../feedback.service';
import { Observable, of } from 'rxjs';
import { Feedback } from 'src/app/models/feedback';
import { delay, tap } from 'rxjs/operators';

export class LocalFeedbackService extends FeedbackService {

    sendFeedback(feedback: Feedback): Observable<Feedback> {
        return of(feedback).pipe(delay(1000), tap((f: Feedback) => {
            if (new Date().getTime() % 3 === 0) {
                throw new Error('sorry something went wrong!');
            } else {
                return of({ ...f, id: '10' });
            }
        }));
    }
}