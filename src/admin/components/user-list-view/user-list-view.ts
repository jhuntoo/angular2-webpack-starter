import {Component, Input} from '@angular/core';

@Component({
    selector: 'user-list-view',
    template:  require('./user-list-view.html'),
    directives: []
})
export class UserListView {

    @Input()
    model:any[];

    constructor() {
        this.model = [];
    }
}
