import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferences } from 'src/app/models/preferences';

export interface PreferencesServiceInterface {

    getPreferences(uid: string): Observable<Preferences>;

    updatePreferences(preferences: Preferences): void;

    deleteAccountInformation(): void;
}

@Injectable()
export abstract class PreferencesService implements PreferencesServiceInterface {

    abstract getPreferences(uid: string): Observable<Preferences>;

    abstract updatePreferences(preferences: Preferences): Observable<boolean>;

    abstract deleteAccountInformation();
}
