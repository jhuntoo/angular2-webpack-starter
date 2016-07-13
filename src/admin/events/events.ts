import {Component, OnChanges} from '@angular/core';
import {Logger, LoggingService} from '../../app/common/log';
import {Event} from '../models/Event';
import {EventsService} from '../services/events-service';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'events-page',  // <home></home>
  styles: [require('./events.scss').toString()],
  template: require('./events.html')
})
export class EventsPageComponent implements OnChanges {

  log:Logger;
  events: Event[];

  constructor(logginService: LoggingService,
              private eventsService: EventsService,
              private router: Router) {
    this.log = logginService.getLogger('EventsPageComponent');
    this.eventsService.eventsChanged.subscribe((events) =>this.setEvents(events));
  }
  setEvents(events: Event[]) {
    this.log.debug(`setEvents: ${JSON.stringify(events)}`);
    this.events = events;
  }


  createNewEvent() {
     this.router.navigate(['NewEvent']);
  }

  ngOnChanges(changes) {
    this.log.debug('Change detected:');
  }

}
