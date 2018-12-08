import { Action, State, StateContext, Selector } from '@ngxs/store';
import { first, retry } from 'rxjs/operators';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackSendFailEvent, FeedbackSendSuccessfullEvent, SendFeedbackAction } from './actions';

export class FeedbackStateModel {
    initialized: boolean;
    error: string;
    feedback: Feedback;
    success?: boolean;
}

@State<FeedbackStateModel>({
    name: 'feedback',
    defaults: {
        initialized: false,
        error: undefined,
        feedback: {} as Feedback
    }
})
export class FeedbackState {

    constructor(private feedbackService: FeedbackService) { }


    @Selector()
    static error({ error }: FeedbackStateModel) {
        return error;
    }
    @Selector()
    static success({ success }: FeedbackStateModel) {
        return success;
    }

    @Action(SendFeedbackAction)
    sendFeedback({ patchState, dispatch }: StateContext<FeedbackStateModel>, { payload }: SendFeedbackAction) {
        this.feedbackService.sendFeedback(payload).pipe(first(), retry(3)).subscribe((res) => {
            dispatch(new FeedbackSendSuccessfullEvent(res));
        }, (err) => {
            dispatch(new FeedbackSendFailEvent(err));
        });
    }

    @Action(FeedbackSendSuccessfullEvent)
    sendFeedbackSuccessfull({ patchState }: StateContext<FeedbackStateModel>, { payload }: FeedbackSendSuccessfullEvent) {
        patchState({ feedback: payload, error: undefined, success: true })
    }

    @Action(FeedbackSendFailEvent)
    sendFeedbackFailed({ patchState }: StateContext<FeedbackStateModel>, { payload }: FeedbackSendFailEvent) {
        patchState({ error: payload })
    }

}