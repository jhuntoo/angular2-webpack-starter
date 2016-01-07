import {Component, View} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {tokenNotExpired} from 'angular2-jwt';


@Component({
  selector: 'private-route',
  template: `<h1>Hello from private route</h1>`
})
@CanActivate(() => tokenNotExpired())
export class PrivateRoute {

}
