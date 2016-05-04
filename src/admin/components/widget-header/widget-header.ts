import {Component, Input} from '@angular/core';

@Component({
    selector: 'widget-header',
    template: require('./widget-header.html')
})
export class WidgetHeader {
    @Input() title:string;

    @Input() icon:string;

    constructor() {
        this.title = '';
        this.icon = '';
    }
}
