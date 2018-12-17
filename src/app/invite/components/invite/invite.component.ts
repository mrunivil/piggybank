import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
    template: `
    <h1> Iam the invitation module of the piggy bank app </h1>
    {{token|json}}
    `
})
export class InviteComponent {

    token: Token;

    constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private store: Store) {
        this.activeRoute.params.subscribe(params => {
            const p = new HttpParams().append('uid', params['token']);
            this.http.get<Token[]>(`${environment.endpoint}/token`, { params: p }).subscribe(
                (res: Array<Token>) => {
                    if (res.length !== 1) {
                        throw new Error('Leider stimmt etwas mit deiner Einladung nicht. Lass dir bitte eine neue schicken');
                    }
                    this.token = res.pop();

                    const d1 = new Date(this.token.valid).getTime();
                    const d2 = new Date().getTime();
                    if (d1 < d2) {
                        throw new Error('Leider ist deine Einladung abgelaufen. Lass dir bitte eine neue schicken');
                    }
                    console.dir(this.token);
                }, err => console.error)




        });
    }
}