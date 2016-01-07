/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

import {Home} from './home/home';
import {Register} from './register/register';
import {PrivateRoute} from './privateroute/privateroute';
import {PublicRoute} from './publicroute/publicroute';
import {Alert, Rating} from 'ng2-bootstrap/ng2-bootstrap';

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
    CORE_DIRECTIVES,
    FORM_DIRECTIVES],
  pipes: [],
  styles: [],
  template: `
<h1>Welcome to Homely</h1>
    <button *ngIf="!loggedIn()" (click)="login()" class="btn btn-default">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()" class="btn btn-default">Logout</button>
    <hr>
    <div>
      <button [routerLink]="['./PublicRoute']" class="btn btn-default">
        Public Route
       </button>
      <button *ngIf="loggedIn()" [routerLink]="['./PrivateRoute']" class="btn btn-default">
        Private Route
      </button>
      <router-outlet class="container"></router-outlet>
    </div>
    <hr>
    <div></div>
    <alert type="info">Welcome to Homely Alert</alert>
    Testing
    <rating [(ngModel)]="rate"
            [max]="max"
            [readonly]="isReadonly"
            [titles]="['one','two','three']" >
    </rating>
    <!--<button (click)="getThing()">Get Thing</button>-->
    <!--<button *ngIf="loggedIn()" (click)="tokenSubscription()">
    Show Token from Observable
    </button>-->
    <!--<button (click)="getSecretThing()">Get Secret Thing</button>-->
    <!--<button *ngIf="loggedIn()" (click)="useJwtHelper()">Use Jwt Helper</button>-->

    <footer>
      Homely
    </footer>

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
  name = 'Homely';
  url = 'http://joinhomely.com';
  lock = new Auth0Lock('BQPabQA0KXdFZEEuzyHvAMHnd5YKlNdj', 'homely.eu.auth0.com');
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public authHttp: AuthHttp) {}

  login() {
    this.lock.show((err: string, profile: string, id_token: string) => {

      if (err) {
        console.log('Error: ' + err);
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getThing() {
    this.http.get('http://localhost:3001/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
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
