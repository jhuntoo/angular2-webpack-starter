import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig, Router} from '@angular/router-deprecated';
import {AuthenticationService, LoggingService, Logger} from '../common/index';

@Component({

  selector: 'verifyemail',
  styles: [ require('./verifyemail.css').toString()],
  template: require('./verifyemail.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class VerifyEmail {
  code: string;
  log:Logger;

  constructor(params: RouteParams,
              private router:Router,
              private authenticationService: AuthenticationService,
              loggingService:LoggingService) {
    this.log = loggingService.getLogger('VerifyEmail');
    this.code = params.get('code');
    this.log.debug(`Code: ${this.code}`);
    authenticationService.verifyEmail(this.code)
      .subscribe(
        (result: boolean) => this.handleResult(result),
        err => this.handleResult(false),
        () => this.log.debug('Random Quote Complete')
      );

  }

  private handleResult(success : boolean) {
      if (success) {
        this.log.debug('Email confirmed');
        this.router.navigate(['Home']);
      } else {
         this.log.debug('Could not confirm email');
         this.router.navigate(['Home']);
      }
  }


}
