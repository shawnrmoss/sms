import { Component, OnInit } from '@angular/core';

// Services 
import { AuthenticationService } from './../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-view',
    template: require('./dashboard.view.html')
})
export class DashboardView implements OnInit {
    constructor(private authentication: AuthenticationService) {
        console.log('Permissions', this.authentication.getPermissions());
     }

    ngOnInit() { }

}
