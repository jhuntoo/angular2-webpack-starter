/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home/home';
import {Navbar} from './navbar/navbar';
import {RegisterForm} from './register/register';
import {VerifyEmail} from './verifyemail/verifyemail';
import {LoginCallback, LoginForm} from './login/index';
import {SearchPage} from './search/search';
import {WelcomePage} from './welcome/welcome';
import {AdminApp} from '../admin/app';
import {ProfilePage} from './profile/profile';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ],
  directives: [ Navbar ],
  pipes: [],
  template: `
    <div class="app ng-scope app-header-fixed">
    <navbar class="app-header"></navbar>


    <main>
      <router-outlet></router-outlet>
    </main>
    </div>

  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/register', component: RegisterForm, name: 'Register' },
  { path: '/search', component: SearchPage, name: 'Search' },
  { path: '/verifyemail/:code/', component: VerifyEmail, name: 'VerifyEmail' },
  { path: '/logincallback', component: LoginCallback, name: 'LoginCallback' },
  { path: '/login', component: LoginForm, name: 'LoginForm' },
  { path: '/welcome', component: WelcomePage, name: 'WelcomePage' },
  { path: '/profile', component: ProfilePage, name: 'Profile' },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', loader: () => require('es6-promise!./about/about')('About'), name: 'About' }
])
export class App {
  name = 'MustRace';
  url = 'https://mustrace.com';
  constructor() {

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

import '../assets/css/font.css';
//import './assets/css/cssparallax.css';
//import './assets/css/reset.css';
//import './assets/css/responsivemobile.css';
//import './assets/css/style.css';
import '../assets/css/less/app.less';

import 'font-awesome-webpack!../../font-awesome.config.js';
