import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router-deprecated';

import { Credential } from '../../types/authentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    template: require('./login-form.component.html'),
    styles: [require('./login-form.component.css')]
})
export class LoginForm implements OnInit {
    public message: string;
    public loading: boolean;
    public credential: Credential;

    constructor(private http: Http,
        private router: Router,
        private authentication: AuthenticationService) {
        this.loading = false;
        this.credential = new Credential(undefined, undefined);
    }

    ngOnInit() { }

    onSubmit() {
        this.loading = true;
        this.authentication.login(this.credential)
            .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                this.router.navigate(['Home']);
            },
            err => {
                console.log(err);
                this.loading = false;
                this.handleError(err); // Display error message to the user
            }
            );
    }

    handleError(value) {
        this.message = JSON.parse(value._body)['error_description'];
    }
}