import {Component} from '@angular/core';

import {Alerts} from '../alerts/alerts';

import {Loading} from '../loading/loading';
import {Widget} from '../widget/widget';

import {WidgetHeader} from '../widget-header/widget-header';
import {WidgetBody} from '../widget-body/widget-body';
import {WidgetFooter} from '../widget-footer/widget-footer';

import {ServerListView} from '../server-list-view/server-list-view';
import {ServerListService} from '../../services/server_list';

import {UserListView} from '../user-list-view/user-list-view';
import {UserListService} from '../../services/user_list';


@Component({
    selector: 'dashboard',
    providers: [ServerListService],
    template: require('./dashboard.html'),
    styles: [require('./dashboard.css').toString()],
    directives: [Alerts, Widget, WidgetHeader, WidgetBody,
        WidgetFooter, Loading, ServerListView, UserListView]
})
export class Dashboard {
    servers:any[];
    users:any[];

    constructor(private serverListService:ServerListService, private userListService:UserListService) {
        this.serverListService = serverListService;
        this.userListService = userListService;
    }

    ngOnInit() {
        this.servers = this.serverListService.all();
        this.users = this.userListService.all();
    }
}
