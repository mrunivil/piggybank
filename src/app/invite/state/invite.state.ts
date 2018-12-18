import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { first, tap, concat, merge, switchAll, switchMap, retry, catchError } from 'rxjs/operators';
import { Token } from 'src/app/models/token';
import { InviteService } from '../services/invite.service';
import { CheckTokenAction, CheckTokenSuccessfulEvent, AddMemberAction, AddMemberSuccessfulEvent, AddMemberFailEvent, DeleteTokenAction } from './actions';
import { Bank } from 'src/app/models/bank';
import { AppState } from 'src/app/shared/state/app.state';
import { of, throwError } from 'rxjs';

export class InviteStateModel {
    initialized: boolean;
    token?: Token;
    bank?: Bank;
}

@State<InviteStateModel>({
    name: 'invite',
    defaults: {
        initialized: false
    }
})
export class InviteState {
    constructor(private service: InviteService, private store: Store) { }

    @Selector()
    static token({ token }: InviteStateModel) {
        return token;
    }
    @Selector()
    static bank({ bank }: InviteStateModel) {
        return bank;
    }

    @Action(CheckTokenAction)
    checkToken({ patchState }: StateContext<InviteStateModel>, { payload }: CheckTokenAction) {
        return this.service.checkToken(payload).pipe(
            first()
            , switchMap(token => {
                patchState({
                    token: token
                })
                return this.service.checkBank(token.bankid).pipe(
                    first()
                    , tap(bank => {
                        patchState({
                            bank: bank
                        })
                    })
                )
            })
        )
    }

    @Action(DeleteTokenAction)
    deleteToken({ patchState, getState }: StateContext<InviteStateModel>) {
        return this.service.deleteToken(getState().token).pipe(
            first()
            , retry(3)
            , tap(_ => patchState({ token: undefined }))
        )
    }

    @Action(AddMemberAction)
    addMember({ getState, patchState }: StateContext<InviteStateModel>) {
        const bank = { ...getState().bank };
        if (bank.members.filter(member => member.uid === this.store.selectSnapshot(AppState.currentUser).uid).length > 0) {
            throw new Error('Du bist bereits Mitglied dieser Piggy Bank');
        }
        bank.members.push(this.store.selectSnapshot(AppState.currentUser));
        return this.service.addMember(bank).pipe(
            first()
            , retry(3)
            , tap(bank => patchState({ bank: bank }))
        )
    }

}
