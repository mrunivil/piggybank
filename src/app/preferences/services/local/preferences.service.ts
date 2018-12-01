import { PreferencesService } from "../preferences.service";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class LocalPreferencesService extends PreferencesService {

    constructor(private http: HttpClient) { super(); }

    getPreferences(uid: string): Observable<Preferences> {
        return this.http.get<Preferences>('./mockdata/preferences.json')
    }

    updatePreferences(preferences: Preferences): Observable<Preferences> {
        return of(preferences).pipe(
            delay(500)
            , tap(val => {
                if (new Date().getTime() % 3 === 0) {
                    throw new Error('sorry something went wrong!');
                }
            })
        );

    }

    deleteAccountInformation() {
        throw new Error('Method not implemented.');
    }
}