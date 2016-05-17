import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
    isDarkTheme: boolean;
    constructor() {
        this.isDarkTheme = true;
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
    }

    getTheme() {
        return Observable.of(this.isDarkTheme);
    }

}
