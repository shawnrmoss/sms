import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

// Services
import { AuthenticationService } from './../../services/authentication.service';

// Type
import { Credential } from './../../types/authentication';

// Components
import { LoginForm } from './../../components/login-form';


@Component({
    moduleId: module.id,
    selector: 'login-view',
    template: require('./login.view.html'),
    styles: [require('./login.view.css')],
    directives: [LoginForm]
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
            this.loading = true;
            this.authentication.login(credential)
                .subscribe(
                data => {
                    // console.log('Success', data);
                    this.loading = false;
                    this.router.navigate(['Index', 'Home']);
                },
                err => {
                    // console.log('Error', err);
                    this.loading = false;
                    this.showError(err); // Display error message to the user
                },
                () => {
                    // console.log('Finally');
                    this.loading = false;
                }
            );
        }
    }

    showError(value) {
        let obj = JSON.parse(value._body);
        this.message = obj.error_description;
    }

}
