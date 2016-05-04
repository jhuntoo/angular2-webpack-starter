import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Config} from '../../config/config';
import {LoggingService} from '../common/log';
import {Logger} from '../common/log';
import {LocalStorage} from '../common/local-storage';
import {Router} from '@angular/router-deprecated';
import {AuthenticationService} from '../common/authentication';
import {SocialLoginResult} from '../common/authentication';
import {SeoService} from '../common/seo-service';

@Component({
  template: require('./login-callback.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class LoginCallback {
  loginCompletionId: string;
  log : Logger;

  constructor(private params: RouteParams,
              private config:Config,
              private _router: Router,
              private authenticationService: AuthenticationService,
              private loggingService : LoggingService,
              private seoService: SeoService) {
    this.log  = loggingService.getLogger('LoginCallback');
    this.loginCompletionId = params.get('id');
  }

  ngOnInit() {
    this.log.debug(`Init: component with loginCompletionId ${this.loginCompletionId}`);
    this.seoService.setTitle('Logging In...');
    this.authenticationService.completeSocialLogin(this.loginCompletionId)
      .subscribe((result : SocialLoginResult) => {this.handleSocialLoginResult(result);},
        (err) => {this.log.error(err);},
        () => {this.log.debug('complete');});

  }
  handleSocialLoginResult(result : SocialLoginResult) {
    if (result.success) {
      if (result.type === 'new') {
        this.log.debug(`Social Login succeeded, redirecting new user to welcome page..`);
        this._router.navigateByUrl('/welcome');
      } else {
        this.log.debug(`Social Login succeeded, redirecting existing user to home page`);
        this._router.navigateByUrl('/');
      }
    } else {
      this.log.debug(`Social Login failed, redirecting to home page`);
      this._router.navigate(['Home']);
    }

  }


}
