import { Component, OnInit } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/feedback';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { LoadUserFeedbackAction, SendUserFeedbackAction } from '../../state/actions';
import { FeedbackState } from '../../state/feedback.state';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

    @Select(FeedbackState.feedback) feedBacks$: Observable<Feedback[]>;
    feedback: Feedback;

    constructor(public store: Store, private actions: Actions) {
        this.feedback = {
            comment: '',
            rating: 0,
            user: this.store.selectSnapshot(AppState.currentUser)
        } as Feedback;
    }

    ngOnInit() {
        this.store.dispatch(new LoadUserFeedbackAction(this.store.selectSnapshot(AppState.currentUser)));
    }

    generateRatings(n: number): number[] {
        return [...Array(n).keys()];
    }

    updateFeedback(): void {
        this.store.dispatch([new SendUserFeedbackAction(this.feedback), new RedirectToDashboardAction]);
    }

    onRatingChanged(value) {
        this.feedback.rating = value;
    }
}