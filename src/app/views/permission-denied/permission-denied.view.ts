import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'permission-denied-view',
    template: require('./permission-denied.view.html'),
    styles: [require('./permission-denied.view.css')]
})
export class PermissionDeniedView implements OnInit {
    public permissionDeniedImg = 'assets/img/you-shall-not-pass.jpg';
    constructor() { }

    ngOnInit() { }

}