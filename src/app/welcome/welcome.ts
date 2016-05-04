import {Component} from '@angular/core';
import {Logger} from '../common/log';
import {LoggingService} from '../common/log';
import {RouteData} from '@angular/router-deprecated';


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
