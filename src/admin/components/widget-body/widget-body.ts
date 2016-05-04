import {Component, Input} from '@angular/core';
@Component({
    selector: 'widget-body',
    template: require('./widget-body.html')
})
export class WidgetBody {
    @Input()
    loading:boolean;

    @Input()
    classes:string;

    constructor() {
        this.loading = false;
        this.classes = '';
    }
}
