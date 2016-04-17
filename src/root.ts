/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {AdminApp} from './admin/app';
import {App} from './app/app';
import {ProfileService} from './app/common/profile-service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'root-app',
  styles: [`
    :host {
      display: block;
      min-height: 100%;
    }
  `],
  template: `
      <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/admin/...', component: AdminApp, name: 'Admin' },
  { path: '/...', component: App, name: 'Index', useAsDefault: true }
])
export class Root {
  // Don't remove ProfileService ! it needs to be instantiated early
  constructor(private profileService: ProfileService) {

  }
}
