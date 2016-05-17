import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
    isDarkTheme: Observable<boolean>;
    constructor() {
        this.isDarkTheme = Observable.create(false);
    }

    toggleTheme() {

    }

    getTheme() {
        return this.isDarkTheme;
    }

}
