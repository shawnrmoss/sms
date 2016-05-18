import { Component, OnInit, Input } from '@angular/core';

// Directives
import { RouterActive } from '../../directives/router-active';

// Services
import { SettingsService } from '../../services/settings.service';

@Component({
    moduleId: module.id,
    selector: 'header',
    template: require('./header.component.html'),
    styles: [require('./header.component.css')],
    directives: [RouterActive]
})
export class HeaderComponent implements OnInit {
    public logo = 'assets/img/angular-logo.png';
    public isDarkTheme: boolean;
    constructor(private settings: SettingsService) {
        this.settings.getTheme().subscribe(x => { this.isDarkTheme = x });
    }

    ngOnInit() { }

    changeTheme() {
        this.settings.toggleTheme();
    }
}
