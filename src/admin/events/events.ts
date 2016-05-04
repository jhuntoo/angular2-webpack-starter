import {Component} from '@angular/core';
import {Logger, LoggingService} from '../../app/common/log';
import {Event} from '../models/Event';


@Component({
  selector: 'events-page',  // <home></home>
  styles: [require('./events.scss').toString()],
  template: require('./events.html')
})
export class EventsPageComponent {

  public events: Event[] = [];
  log:Logger;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CreateEvent');



  }



}
