import {Component} from '@angular/core';

@Component({
    selector: 'server-list-view',
    properties: ['model'],
    template: require('./server-list-view.html')
})
export class ServerListView {

    model:any[];

    constructor() {
        this.model = [];
    }
}
