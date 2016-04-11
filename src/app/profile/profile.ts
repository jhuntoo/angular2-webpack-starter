import {Component} from 'angular2/core';
import {AuthenticationService, LoggingService, Logger} from '../common/index';
import {Router} from 'angular2/router';

@Component({

  selector: 'profile',
  styles: [require('./profile.less').toString()],
  template: require('./profile.html')
})

export class Profile {
  log:Logger;
  constructor(private auth: AuthenticationService, loggingService: LoggingService, router: Router) {
    this.log = loggingService.getLogger('Profile');
    if (!auth.isLoggedIn) {
      this.log.debug(`Is NOT logged in.`);
      router.navigate(['LoginForm']);
    } else {
      this.log.debug(`Is logged in.`);
    }
  }
}
