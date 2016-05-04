import {Component} from '@angular/core';

import {Loading} from '../loading/loading';
import {Widget} from '../widget/widget';

import {WidgetHeader} from '../widget-header/widget-header';
import {WidgetBody} from '../widget-body/widget-body';
import {WidgetFooter} from '../widget-footer/widget-footer';

import {ServerListView} from '../server-list-view/server-list-view';
import {ServerListService} from '../../services/server_list';


@Component({
    selector: 'tables',
    providers: [ServerListService],
    template: require('./tables.html'),
    directives: [Widget, WidgetHeader, WidgetBody, WidgetFooter, Loading, ServerListView]
})
export class Tables {
    servers:any[];
    constructor(private serverListService:ServerListService) {
    }

    ngOnInit() {
        this.servers = this.serverListService.all();
    }
}
