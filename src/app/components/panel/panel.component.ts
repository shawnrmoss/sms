import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'panel',
    template: require('./panel.component.html')
})
export class Panel implements OnInit {
    @Input() width: string;
    constructor() { }

    ngOnInit() { }

}
