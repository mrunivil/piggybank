import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';
import { environment } from 'src/environments/environment';
import { PreferencesService } from "../preferences.service";

@Injectable()
export class LocalPreferencesService extends PreferencesService {

    constructor(private http: HttpClient) { super(); }

    getPreferences(uid: string): Observable<Preferences[]> {
        const params = new HttpParams()
            .append('uid', uid);
        return this.http.get<Preferences[]>(`${environment.endpoint}/user_preferences`, { params });
    }

    updatePreferences(preferences: Preferences): Observable<Preferences> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');
        if (preferences.id) {
            return this.http.put<Preferences>(`${environment.endpoint}/user_preferences/${preferences.id}`, preferences, { headers });
        } else {
            return this.http.post<Preferences>(`${environment.endpoint}/user_preferences`, preferences, { headers });
        }

    }

    deleteAccountInformation() {
        throw new Error('Method not implemented.');
    }
}