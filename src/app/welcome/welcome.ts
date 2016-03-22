import {Component} from 'angular2/core';
import {Logger} from '../common/log';
import {LoggingService} from '../common/log';


@Component({

  selector: 'welcome-page',
  template: require('./welcome.html')
})
export class WelcomePage {
  log:Logger;


  constructor(logginService: LoggingService) {
    let log : Logger = logginService.getLogger('WelcomePage');
    this.log = log;
  }

}
