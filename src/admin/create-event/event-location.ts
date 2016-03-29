import {Component, Input} from 'angular2/core';
import {Location} from './models/Location';
import {LoggingService, Logger} from '../../app/common/log';

@Component({
  selector: 'event-location',  // <home></home>
  template: require('./event-location.html')
})
export class EventLocation {

  @Input() location: Location;
  log:Logger;
  editing: boolean = false;
  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryItem');
  }

}
