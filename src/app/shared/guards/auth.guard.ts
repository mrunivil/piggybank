import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppStateModel, AppState } from '../state/app.state';
import { User } from 'src/app/models/user';
import { RedirectToLoginAction } from '../state/actions';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(public store: Store) { }

    canActivate(): boolean {
        const user = this.store.selectSnapshot<User>((state) => state.app.user);
        if (!user || user === null) {
            this.store.dispatch(new RedirectToLoginAction);
        }
        return user && user !== null;
    }

    canLoad(): boolean {
        return this.canActivate();
    }

}