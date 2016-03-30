import {Component, Input} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';

@Component({
  selector: 'registration-type-item',  // <home></home>
  template: require('./registration-type-item.html')
})
export class RegistrationTypeItem {

  @Input() model: EventCategoryRegistrationType;
  log:Logger;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryItem');
  }
}
