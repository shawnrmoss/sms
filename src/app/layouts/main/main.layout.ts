import { Component, OnInit } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

// Components
import { HeaderComponent } from './../../components/header';

// Views
import { HomeView } from './../../views/home';

@Component({
    moduleId: module.id,
    selector: 'main-layout',
    template: require('./main.layout.html'),
    styles: [require('./main.layout.css')],
    directives: [HeaderComponent]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeView, useAsDefault: true },
  { path: '/home', name: 'Home', component: HomeView }
])
export class MainLayout implements OnInit {

    constructor() { }

    ngOnInit() { }
}
