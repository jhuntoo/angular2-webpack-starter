import {Component, Input, HostBinding} from 'angular2/core';
import {EventCategory} from './models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {Select} from 'ng2-select/ng2-select';
import {AgeRestriction} from './models/AgeRestriction';

@Component({
  selector: 'age-restriction',  // <home></home>
  styles: [ require('./age-restriction.less').toString()],
  template: require('./age-restriction.html')
})
export class AgeRestrictionItem {

  @Input() model: AgeRestriction;
  log:Logger;
  editing: boolean = false;
  enabled: boolean = false;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryItem');
  }

  edit(): void {
    this.editing = true;
  }

  save(): void {
    this.editing = false;
  }

  delete(): void {
    this.editing = false;
  }

  stopEditing(): void {
    this.editing = false;
  }

}
