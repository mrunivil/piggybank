import { PreferencesService } from "../preferences.service";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';

@Injectable()
export class FirebasePreferencesService extends PreferencesService {

    getPreferences(uid: string): Observable<Preferences> {
        throw new Error('Method not implemented.');
    }

    updatePreferences(preferences: Preferences): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    deleteAccountInformation() {
        throw new Error('Method not implemented.');
    }
}