/*
 * Angular 2 decorators and services
 */
import {Component, ViewChild, AfterViewInit, HostListener} from 'angular2/core';
import {NgZone} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {HomeComponent} from './home/home';
import {SideMenu} from './side-menu/side-menu';
import {AdminHeaderComponent} from './header/header';
import {CreateEvent} from './create-event/create-event';

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
  providers: [ ],
  directives: [SideMenu, AdminHeaderComponent],
  pipes: [],
  styles: [`
    :host {
      display: block;
      min-height: 100%;
    }
  `, require('./app.scss').toString()],
  template: require('./app.html')

})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Index' },
  { path: '/events/create', component: CreateEvent, name: 'CreateEvent' }

])
export class AdminAppComponent implements AfterViewInit {
  public isMenuFolded:boolean = false;
  @ViewChild('header') header: AdminHeaderComponent;
  @ViewChild('sideMenu') sideMenu: SideMenu;

  onResize(event) {
    this.ngZone.run(() => {
      if (getWindowSize().width > 768) {
        this.handleToggleChanged(false);

      } else {
        this.handleToggleChanged(true);
      }

    });
  }
  constructor(private ngZone:NgZone) {

  }

  ngAfterViewInit():any {
    this.header.toggleChanged.subscribe((isFolded) => {this.handleToggleChanged(isFolded);});
    this.sideMenu.isFoldedChanged.subscribe((isFolded) => {this.handleToggleChanged(isFolded);});
  }

  handleToggleChanged(isFolded : boolean) {
    console.log(`handleToggleChanged: ${JSON.stringify(isFolded)}`);
    this.isMenuFolded = isFolded;
    this.header.isSideMenuCollapsed = isFolded;
    this.sideMenu.isFolded = isFolded;
  }
}

import './assets/css/font.css';
//import './assets/css/cssparallax.css';
//import './assets/css/reset.css';
//import './assets/css/responsivemobile.css';
//import './assets/css/style.css';
import './assets/css/less/app.less';

