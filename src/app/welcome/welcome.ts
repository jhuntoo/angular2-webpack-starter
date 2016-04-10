import {Component} from 'angular2/core';
import {Logger} from '../common/log';
import {LoggingService} from '../common/log';
import {RouteData} from 'angular2/router';


@Component({

  selector: 'welcome-page',
  template: require('./welcome.html')
})
export class WelcomePage {
  log:Logger;


  constructor(logginService: LoggingService, data: RouteData) {
    let log : Logger = logginService.getLogger('WelcomePage');
    let emailSent = data.get('emailSent');
    this.log = log;
    this.log.debug(`emailSent: ${emailSent}`);
  }

}
