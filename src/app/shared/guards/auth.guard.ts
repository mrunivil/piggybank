import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';
import { RedirectToLoginAction } from '../state/actions';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(public store: Store) { }

    canActivate(): boolean {
        const user = this.store.selectSnapshot<User>((state) => state.app.user);
        if (!user || user === null) {
            const url = new URL(window.location.href);
            this.store.dispatch(new RedirectToLoginAction(url.pathname.includes('login') ? undefined : url));
        }
        return user && user !== null;
    }

    canLoad(): boolean {
        return this.canActivate();
    }

}