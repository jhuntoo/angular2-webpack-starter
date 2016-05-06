/*
 * Angular 2 decorators and services
 */
import {Component, ViewChild, AfterViewInit, HostListener, NgZone} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {HomeComponent} from './home/home';
import {SideMenu} from './side-menu/side-menu';
import {AdminHeaderComponent} from './header/header';
import {CreateEvent} from './create-event/create-event';
import {EventsPageComponent} from './events/events';

import {OffClickDirective} from '../common/off-click';

import {Dashboard} from './components/dashboard/dashboard';
import {Tables} from './components/tables/tables';
import {ServerListService} from './services/server_list';
import {UserListService} from './services/user_list';
import {EVENT_PROVIDERS} from './services/events-service';




function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'admin-app',
  providers: [ ServerListService, UserListService, EVENT_PROVIDERS ],
  directives: [SideMenu, AdminHeaderComponent, OffClickDirective],
  pipes: [],
  styles: [`
    :host {
      display: block;
      min-height: 100%;
    }
  `, require('./app.css').toString()],
  template: require('./app.html')

})
@RouteConfig([
  { path: '/', component: Dashboard, name: 'Dashboard' },
  { path: '/events', component: EventsPageComponent, name: 'Events' },
  { path: '/events/new', component: CreateEvent, name: 'NewEvent' },
  {path: '/tables', component: Tables, name: 'Tables'}
])
export class AdminAppComponent {
  mobileView:number = 992;
  menuOpen:boolean = false;
  toggle:boolean = false;

  constructor() {
    this.attachEvents();
    this.clickedOutside = this.clickedOutside.bind(this);
  }

  attachEvents() {
    window.onresize = ()=> {
      if (this.getWidth() >= this.mobileView) {
        if (localStorage.getItem('toggle')) {
          this.toggle = !localStorage.getItem('toggle') ? false : true;
        } else {
          this.toggle = true;
        }
      } else {
        this.toggle = false;
      }
    };
  }

  getWidth() {
    return window.innerWidth;
  }

  onMenuClicked() {
    this.menuOpen = !this.menuOpen;
  }
  clickedOutside() {
    console.log('clickedOutside');
    this.menuOpen = false;
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
    localStorage.setItem('toggle', this.toggle.toString());
  }
}


import './assets/less/app.less';

//import './assets/css/font.css';
////import './assets/css/cssparallax.css';
////import './assets/css/reset.css';
////import './assets/css/responsivemobile.css';
////import './assets/css/style.css';
//import './assets/css/less/app.less';

