import {Component, Input} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';
import {AgeRestrictionItem} from './age-restriction';

@Component({
  selector: 'registration-type-item',  // <home></home>
  directives: [AgeRestrictionItem],
  template: require('./registration-type-item.html')
})
export class RegistrationTypeItem {

  @Input() model: EventCategoryRegistrationType;
  log:Logger;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryItem');
    this.model = new EventCategoryRegistrationType();
  }
}
