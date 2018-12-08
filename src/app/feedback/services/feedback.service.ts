import { Injectable } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { Observable } from 'rxjs';

export interface FeedbackServiceInterface {
    sendFeedback(feddback: Feedback): Observable<Feedback>;
}


@Injectable()
export abstract class FeedbackService implements FeedbackServiceInterface {
    abstract sendFeedback(feddback: Feedback): Observable<Feedback>;
}