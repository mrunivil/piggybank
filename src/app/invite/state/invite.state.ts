import { State, Action, StateContext } from '@ngxs/store';
import { CheckTokenAction, CheckTokenFailEvent } from './actions';
import { InviteService } from '../services/invite.service';
import { first, catchError } from 'rxjs/operators';
import { Token } from 'src/app/models/token';
import { of } from 'rxjs';

export class InviteStateModel {
    initialized: boolean;
    token?: Token;
}

@State<InviteStateModel>({
    name: 'invite',
    defaults: {
        initialized: false
    }
})
export class InviteState {
    constructor(private service: InviteService) { }

    @Action(CheckTokenAction)
    checkToken({ dispatch, patchState }: StateContext<InviteStateModel>, { payload }: CheckTokenAction) {
        this.service.checkToken(payload).pipe(
            first()
            // , catchError(err => {
            //     debugger
            //     dispatch(new CheckTokenFailEvent(err));
            //     return of(undefined);
            // })
        ).subscribe(res => {
            patchState({
                token: res
            })
        }, err => {
            dispatch(new CheckTokenFailEvent(err));
        })
    }
}
