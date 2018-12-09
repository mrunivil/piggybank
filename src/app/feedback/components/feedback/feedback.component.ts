import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FeedbackState } from '../../state/feedback.state';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/feedback';
import { AppState } from 'src/app/shared/state/app.state';
import { SendFeedbackAction } from '../../state/actions';
import { takeWhile } from 'rxjs/operators';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

    @Select(FeedbackState.error) error$: Observable<string>;
    @Select(FeedbackState.success) success$: Observable<boolean>;
    feedback: Feedback;

    constructor(public store: Store) {
        this.feedback = {
            comment: '',
            rating: 0,
            user: this.store.selectSnapshot(AppState.currentUser)
        } as Feedback;
    }

    updateFeedback(): void {
        this.store.dispatch(new SendFeedbackAction(this.feedback));
        this.success$.pipe(takeWhile(res => res !== true)).subscribe((res) => { }, (err) => { }, () => {
            this.store.dispatch(new RedirectToDashboardAction);
        });
    }

    onRatingChanged(value) {
        this.feedback.rating = value;
    }
}