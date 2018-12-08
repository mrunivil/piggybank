import { FeedbackService } from '../feedback.service';
import { Feedback } from 'src/app/models/feedback';
import { Observable } from 'rxjs';
/**
 *
 *
 * @export
 * @class FirebaseFeedbackService
 * @extends {FeedbackService}
 */
export class FirebaseFeedbackService extends FeedbackService {
    sendFeedback(feedback: Feedback): Observable<Feedback> {
        throw new Error('sending feedback to firebase is not implemented yet');
        // return null;
    }
}