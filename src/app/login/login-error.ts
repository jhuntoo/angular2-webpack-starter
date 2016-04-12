import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from 'angular2/router';
import {Config} from '../../config/config';
import {LoggingService} from '../common/log';
import {Logger} from '../common/log';
import {LocalStorage} from '../common/local-storage';
import {Router} from 'angular2/router';
import {AuthenticationService} from '../common/index';
import {SeoService} from '../common/seo-service';

@Component({
  template: require('./login-error.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class LoginError implements OnInit {

  log : Logger;

  constructor(private config:Config,
              private router: Router,
              private authenticationService: AuthenticationService,
              private loggingService : LoggingService,
              private seoService: SeoService) {
    this.log  = loggingService.getLogger('LoginError');
  }

  ngOnInit() {
    this.seoService.setTitle('Login Error');
    if (this.authenticationService.isLoggedIn) {
        this.log.debug('Already logged in, redirecting...');
        this.router.navigate(['Index']);
    }
  }
}
