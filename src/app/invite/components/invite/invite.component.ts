import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, first, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { LocalInviteService } from '../../services/local/invite.service';
import { InviteService } from '../../services/invite.service';
import { of } from 'rxjs';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { CheckTokenAction, CheckTokenSuccessfulEvent, CheckTokenFailEvent } from '../../state/actions';
import { InviteState } from '../../state/invite.state';

@Component({
    template: `
    <app-header [title]="'Einladung'"></app-header>
    <div class="content-wrapper">
        <h1> Iam the invitation module of the piggy bank app </h1>
        {{token|json}}
    </div>
    `
})
export class InviteComponent {

    constructor(
        private activeRoute: ActivatedRoute
        , private actions: Actions
        , private store: Store
    ) {
        this.activeRoute.params.subscribe(params => {
            this.store.dispatch(new CheckTokenAction(params['token'])).pipe(
                first()
            ).subscribe(_ => {
                if (confirm(`Möchtest du der ${this.store.selectSnapshot(InviteState.token).name} beitreten?`)) {
                    // Füge neues Member hinzu

                    //redirect to bank details
                } else {
                    // redirect to dashboard
                }
                // Lösche den Token
            }, err => this.store.dispatch(new CheckTokenFailEvent(err)));
        });
    }
}
