import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    @Output() submit = new EventEmitter<Credential>();

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
        this.submit.emit(this.credential);
    }
}
