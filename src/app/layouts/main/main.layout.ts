import { Component, OnInit } from '@angular/core';
import { CanActivate, ComponentInstruction, RouteConfig, Router } from '@angular/router-deprecated';

// Helpers
import { isLoggedIn } from '../../helpers/is-logged-in';

// Components
import { HeaderComponent } from './../../components/header';

// Views
import { DashboardView } from './../../views/dashboard';
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
  { path: '/', name: 'Dashboard', component: DashboardView, useAsDefault: true },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/denied', name: 'PermissionDenied', component: PermissionDeniedView }
])
export class MainLayout implements OnInit {

  constructor() { }

  ngOnInit() { }
}
