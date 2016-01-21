/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {HeaderBar} from './headerbar/headerbar';

import {Home} from './home/home';
import {Register} from './register/register';
import {PrivateRoute} from './privateroute/privateroute';
import {PublicRoute} from './publicroute/publicroute';
import {Alert, Rating} from 'ng2-bootstrap/ng2-bootstrap';
import {AppConfig} from "../config/config";

declare var Auth0Lock;
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, Alert,
    Rating,
    HeaderBar,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES],
  pipes: [],
  styles: [],
  template: `
   <body>
        <div class="app-content" ng-class="{loading: loading}">
          <headerbar data-ng-include=" 'assets/views/partials/top-navbar.html' " class="navbar navbar-default navbar-static-top hidden-print">Loading header</headerbar>
      </div>
    </body>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' },
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])
export class App {
  title: string;
  constructor(config : AppConfig) {

  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
