import { PreferencesService } from "../preferences.service";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable()
export class LocalPreferencesService extends PreferencesService {

    constructor(private http: HttpClient) { super(); }

    getPreferences(uid: string): Observable<Preferences> {
        return this.http.get<Preferences>('./mockdata/preferences.json')
    }

    updatePreferences(preferences: Preferences): Observable<boolean> {
        return of(true);
    }

    deleteAccountInformation() {
        throw new Error('Method not implemented.');
    }
}