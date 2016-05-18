import { Component, OnInit } from '@angular/core';
import { CanActivate, ComponentInstruction, RouteConfig, Router } from '@angular/router-deprecated';

// Helpers
import { isLoggedIn } from '../../helpers/is-logged-in';

// Components
import { HeaderComponent } from './../../components/header';

// Views
import { HomeView } from './../../views/home';
import { PermissionDeniedView } from './../../views/permission-denied';

@Component({
    moduleId: module.id,
    selector: 'main-layout',
    template: require('./main.layout.html'),
    styles: [require('./main.layout.css')],
    directives: [HeaderComponent]
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeView, useAsDefault: true },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/denied', name: 'PermissionDenied', component: PermissionDeniedView }
])
export class MainLayout implements OnInit {

    constructor() { }

    ngOnInit() { }
}
