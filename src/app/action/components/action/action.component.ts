import { Component } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { first, pluck, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {

    title$: Observable<string>

    constructor(private route: ActivatedRoute) {
        this.title$ = this.route.params.pipe(
            first(),
            pluck('type'),
            map(type => {
                switch (type) {
                    case 'deposit':
                        return 'Einzahlung';
                    case 'payment':
                        return 'Auszahlung';
                    default:
                        throw new Error('not a valid action');
                }
            })
        );
    }

    save(): void {

    }
}