import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

// Services
import { AuthenticationService } from './../../services/authentication.service';

// Type
import { Credential } from './../../types/authentication';

// Components
import { Panel } from './../../components/panel';
import { LoginForm } from './../../components/login-form';


@Component({
    moduleId: module.id,
    selector: 'login-view',
    template: require('./login.view.html'),
    styles: [require('./login.view.css')],
    directives: [Panel, LoginForm]
})
export class LoginView implements OnInit {
    public logo = 'assets/img/angular-logo.png';
    public loading: boolean;
    public message: string;

    constructor(private authentication: AuthenticationService, private router: Router) {
        this.loading = false;
        this.message = '';
    }

    ngOnInit() { }

    login(credential: Credential) {
        if (credential.email) {
            this.authentication.login(credential)
                .subscribe(
                data => {
                    console.log(data);
                    this.loading = false;
                    this.router.navigate(['Index', 'Home']);
                },
                err => {
                    console.log(err);
                    this.loading = false;
                    this.handleError(err); // Display error message to the user
                }
            );
        }
    }

    handleError(value) {
        console.log(JSON.parse(value._body));
        //this.message = JSON.parse(value._body)["error_description"];
    }

}
