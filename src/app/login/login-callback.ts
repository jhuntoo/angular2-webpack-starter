import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from 'angular2/router';
import {Config} from '../../config/config';
import {LoggingService} from '../common/log';
import {Logger} from '../common/log';
import {LocalStorage} from '../common/local-storage';
import {Router} from 'angular2/router';
import {AuthenticationService} from '../common/authentication';
import {SocialLoginResult} from '../common/authentication';

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
              private loggingService : LoggingService) {
    this.log  = loggingService.getLogger('LoginCallback');
    this.loginCompletionId = params.get('id');
  }

  ngOnInit() {
    console.log(`hello 'LoginCallback' component with loginCompletionId ${this.loginCompletionId}`);
    this.authenticationService.completeSocialLogin(this.loginCompletionId)
      .subscribe((result : SocialLoginResult) => this.handleSocialLoginResult,
        (err) => {this.log.error(err);},
        () => {this.log.debug('complete');});

  }
  handleSocialLoginResult(result : SocialLoginResult) {
    if (result.success) {
      if (result.type === 'type') {
        this._router.navigate(['WelcomePage']);
      }
    }
    this._router.navigate(['WelcomePage']);
  }


}
