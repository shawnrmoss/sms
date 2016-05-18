import { Component, OnInit } from '@angular/core';

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
    constructor() { }

    ngOnInit() { }
}
