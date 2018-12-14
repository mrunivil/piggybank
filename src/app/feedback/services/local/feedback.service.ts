import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/feedback';
import { environment } from 'src/environments/environment';
import { FeedbackService } from '../feedback.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalFeedbackService extends FeedbackService {

    constructor(private http: HttpClient) { super() }

    sendFeedback(feedback: Feedback): Observable<Feedback> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        if (feedback.id) {
            return this.http.put<Feedback>(`${environment.endpoint}/user_feedback/${feedback.id}`, feedback, { headers });
        } else {
            return this.http.post<Feedback>(`${environment.endpoint}/user_feedback`, feedback, { headers });
        }
    }

    loadUserFeedback(uid: string): Observable<Feedback[]> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        const params = new HttpParams()
            .append('owner.uid', uid);
        return this.http.get<Feedback[]>(`${environment.endpoint}/user_feedback`, { headers, params });
    }
}