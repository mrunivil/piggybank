import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, retry, tap } from 'rxjs/operators';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from '../services/feedback.service';
import { SendUserFeedbackAction, LoadUserFeedbackAction } from './actions';
import { SendUserFeedbackSuccessEvent, SendUserFeedbackFailEvent, LoadUserFeedbackSuccessfulEvent, LoadUserFeedbackFailEvent } from 'src/app/shared/state/events';

export class FeedbackStateModel {
    initialized: boolean;
    feedback: Feedback[];
}

@State<FeedbackStateModel>({
    name: 'feedback',
    defaults: {
        initialized: false,
        feedback: []
    }
})
export class FeedbackState {

    constructor(private feedbackService: FeedbackService) { }
    @Selector()
    static feedback({ feedback }: FeedbackStateModel) {
        return feedback;
    }
    @Action(LoadUserFeedbackAction)
    loadUserFeedback({ patchState, dispatch }: StateContext<FeedbackStateModel>, { payload }: LoadUserFeedbackAction) {
        this.feedbackService.loadUserFeedback(payload.uid).pipe(first(), retry(3), tap(res => {
            patchState({
                feedback: res
            })
        })).subscribe((res) => {
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