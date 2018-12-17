import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first, tap, concat, merge, switchAll, switchMap } from 'rxjs/operators';
import { Token } from 'src/app/models/token';
import { InviteService } from '../services/invite.service';
import { CheckTokenAction, CheckTokenSuccessfulEvent } from './actions';

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

    @Selector()
    static token({ token }: InviteStateModel) {
        return token;
    }

    @Action(CheckTokenAction)
    checkToken({ patchState }: StateContext<InviteStateModel>, { payload }: CheckTokenAction) {
        return this.service.checkToken(payload).pipe(
            first()
            , switchMap(token => {
                patchState({
                    token: token
                })
                return this.service.checkBank(token.bankid)
            })
        )
    }



}
