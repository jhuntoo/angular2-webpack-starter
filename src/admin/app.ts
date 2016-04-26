/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {HomeComponent} from './home/home';
import {SideMenu} from './side-menu/side-menu';
import {AdminHeaderComponent} from './header/header';
import {CreateEvent} from './create-event/create-event';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'admin-app',
  providers: [ ],
  directives: [SideMenu, AdminHeaderComponent],
  pipes: [],
  styles: [`
    :host {
      display: block;
      min-height: 100%;
    }
  `],
  template: require('./app.html')

})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Index' },
  { path: '/events/create', component: CreateEvent, name: 'CreateEvent' }

])
export class AdminAppComponent {
  public isMenuFolded:boolean = false;
  constructor() {

  }

  handleToggleChanged(event) {
    console.log(`handleToggleChanged: ${JSON.stringify(event)}`);
    this.isMenuFolded = event.value;
  }
}

import './assets/css/font.css';
//import './assets/css/cssparallax.css';
//import './assets/css/reset.css';
//import './assets/css/responsivemobile.css';
//import './assets/css/style.css';
import './assets/css/less/app.less';

