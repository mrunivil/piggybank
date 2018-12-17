import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, first, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';
import { LocalInviteService } from '../../services/local/invite.service';
import { InviteService } from '../../services/invite.service';
import { of } from 'rxjs';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';
import { CheckTokenAction } from '../../state/actions';

@Component({
    template: `
    <h1> Iam the invitation module of the piggy bank app </h1>
    {{token|json}}
    `
})
export class InviteComponent {

    token: Token;

    constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private store: Store, private test: InviteService) {
        this.activeRoute.params.subscribe(params => {
            this.store.dispatch(new CheckTokenAction(params['token']));
        });
    }
}
