/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Navbar} from './navbar/navbar';
import {RegisterForm} from './register/register';
import {VerifyEmail} from './verifyemail/verifyemail';
import {LoginCallback} from './login/login-callback';
import {EmailSentForm} from './register/email-sent';
import {SearchPage} from './search/search';
import {WelcomePage} from './welcome/welcome';

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
    <!--<header>-->
      <!--<nav>-->
        <!--<h1>Hello {{ name }}</h1>-->
        <!--<ul>-->
          <!--<li router-active>-->
            <!--<a [routerLink]=' ['Index'] '>Index</a>-->
          <!--</li>-->
          <!--<li router-active>-->
            <!--<a [routerLink]=" ['Home'] '>Home</a>-->
          <!--</li>-->
          <!--<li router-active>-->
            <!--<a [routerLink]=' ['About'] '>About</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</nav>-->
    <!--</header>-->

      <navbar></navbar>


    <main>
      <router-outlet></router-outlet>
    </main>

  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/register', component: RegisterForm, name: 'Register' },
  { path: '/search', component: SearchPage, name: 'Search' },
  { path: '/emailsent', component: EmailSentForm, name: 'EmailSent' },
  { path: '/verifyemail/:code/', component: VerifyEmail, name: 'VerifyEmail' },
  { path: '/logincallback', component: LoginCallback, name: 'LoginCallback' },
  { path: '/welcome', component: WelcomePage, name: 'WelcomePage' },
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
