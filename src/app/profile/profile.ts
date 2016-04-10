import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
  Collapse
} from 'ng2-bootstrap/components/collapse';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {AuthenticationService} from '../common/authentication';
import {OffClickDirective, LoggingService, Logger} from '../common/index';

@Component({

  selector: 'profile',
  directives: [
    Collapse,
    DROPDOWN_DIRECTIVES,
    OffClickDirective,
  ],
  styles: [require('./navbar.less').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./navbar.html')
})
export class Profile {
  log:Logger;
  constructor(private authenticationService: AuthenticationService, loggingService: LoggingService) {
    this.log = loggingService.getLogger('Profile');

  }



}
