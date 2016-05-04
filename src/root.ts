/*
 * Angular 2 decorators and services
 */
import {Component} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {AdminAppComponent} from './admin/app';
import {AppComponent} from './app/app';
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
  { path: '/admin/...', component: AdminAppComponent, name: 'Admin' },
  { path: '/...', component: AppComponent, name: 'Index', useAsDefault: true }
])
export class RootComponent {
  // Don't remove ProfileService ! it needs to be instantiated early
  constructor(private profileService: ProfileService) {

  }
}
