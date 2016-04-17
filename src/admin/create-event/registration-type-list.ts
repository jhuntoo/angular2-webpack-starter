import {Component, Input} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';
import {RegistrationTypeItem} from './registration-type-item';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'registration-type-list',  // <home></home>
  directives: [RegistrationTypeItem, ACCORDION_DIRECTIVES],
  template: require('./registration-type-list.html')
})
export class RegistrationTypeList {

  log:Logger;
  @Input() registrationTypes: EventCategoryRegistrationType[];
  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('RegistrationTypeList');
  }

  add() {
    let newRegistrationType = new EventCategoryRegistrationType();
    if (this.registrationTypes.length > 0) {
      let lastRegistrationType = this.registrationTypes[this.registrationTypes.length - 1];
      //newRegistrationType.sportId = lastRegistrationType.sportId;
      newRegistrationType.registrationClosureDate = lastRegistrationType.registrationClosureDate;
    }

    this.registrationTypes.push(newRegistrationType);
    this.log.debug(`categories: ${JSON.stringify(this.registrationTypes)}`);
  }
}
