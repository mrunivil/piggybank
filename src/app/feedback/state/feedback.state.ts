import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from '../services/feedback.service';
import { SendUserFeedbackAction, LoadUserFeedbackAction } from './actions';
import { SendUserFeedbackSuccessEvent, SendUserFeedbackFailEvent, LoadUserFeedbackSuccessfulEvent, LoadUserFeedbackFailEvent } from 'src/app/shared/state/events';

export class FeedbackStateModel {
    initialized: boolean;
}

@State<FeedbackStateModel>({
    name: 'feedback',
    defaults: {
        initialized: false,
    }
})
export class FeedbackState {

    constructor(private feedbackService: FeedbackService) { }

    @Action(LoadUserFeedbackAction)
    loadUserFeedback({ patchState, dispatch }: StateContext<FeedbackStateModel>, { payload }: LoadUserFeedbackAction) {
        this.feedbackService.loadUserFeedback(payload.uid).pipe(first(), retry(3)).subscribe((res) => {
            dispatch(new LoadUserFeedbackSuccessfulEvent(res));
        }, (err) => {
            dispatch(new LoadUserFeedbackFailEvent(err));
        });
    }

    @Action(SendUserFeedbackAction)
    sendUserFeedback({ patchState, dispatch }: StateContext<FeedbackStateModel>, { payload }: SendUserFeedbackAction) {
        this.feedbackService.sendFeedback(payload).pipe(first(), retry(3)).subscribe((res) => {
            dispatch(new SendUserFeedbackSuccessEvent(res));
        }, (err) => {
            dispatch(new SendUserFeedbackFailEvent(err));
        });
    }
}