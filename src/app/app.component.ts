/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, Host } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';

// Services
import { SettingsService } from './services/settings.service';

// Components
import { MainLayout } from './layouts/main';
import { LoginView } from './views/login';



// Styles
import '../assets/scss/main.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'body',
  host: {
    '[class.sms-theme--dark]': 'isDarkTheme',
    '[class.sms-theme--light]': '!isDarkTheme'
  },
  pipes: [],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css')
  ],
  template: require('./app.component.html')
})
@RouteConfig([
  { path: '/...', name: 'Index', component: MainLayout, useAsDefault: true },
  { path: '/login', component: LoginView, name: 'Login' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  loading = false;
  public isDarkTheme: boolean;
  constructor(public appState: AppState, private settings: SettingsService) {
    this.settings.getTheme().subscribe(x => { this.isDarkTheme = x });
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}


/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
