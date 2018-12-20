import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError, first } from 'rxjs/operators';
import { RedirectToBankDetailsAction, RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { AddMemberAction, AddMemberSuccessfulEvent, CheckTokenAction, CheckTokenFailEvent, DeleteTokenAction } from '../../state/actions';
import { InviteState } from '../../state/invite.state';

@Component({
    template: `
    <app-header [title]="'Einladung'"></app-header>
    <div class="content-wrapper">
        <h1> Iam the invitation module of the piggy bank app </h1>
    </div>
    `
})
export class InviteComponent {

    constructor(
        private activeRoute: ActivatedRoute
        , private store: Store
    ) {
        this.activeRoute.params.subscribe(params => {
            this.store.dispatch(new CheckTokenAction(params['token'])).pipe(
                first()
            ).subscribe(_ => {
                if (confirm(`Möchtest du der ${this.store.selectSnapshot(InviteState.token).name} beitreten?`)) {
                    this.store.dispatch(new AddMemberAction)
                        .pipe(
                            catchError(err => {
                                this.store.dispatch(new CheckTokenFailEvent(err));
                                throw err
                            })
                        )
                        .subscribe(_ => {
                            this.store.dispatch([
                                // Add new Member to Bank
                                new AddMemberSuccessfulEvent(this.store.selectSnapshot(InviteState.bank))
                                //redirect to bank details
                                , new RedirectToBankDetailsAction]);
                        }, err => {
                            this.store.dispatch(new CheckTokenFailEvent(err));
                        })
                } else {
                    // redirect to dashboard
                    this.store.dispatch(new RedirectToDashboardAction);
                }
                // Lösche den Token
                this.store.dispatch(new DeleteTokenAction);
            }, err => this.store.dispatch([new CheckTokenFailEvent(err)]));
        });
    }
}
