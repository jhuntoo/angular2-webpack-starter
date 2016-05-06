import {Injectable, provide} from '@angular/core';
import {Config} from '../../config/config';
import {Observable, Subject} from 'rxjs';
import {LoggingService, Logger} from '../../app/common/log';
import {Event }from '../models/Event';


@Injectable()
export class EventsService {

  eventsChanged:Subject<Event[]> = new Subject<Event[]>();
  events: Event[] = [];
  isLoggedIn:boolean = false;
  log: Logger;
  constructor(private config:Config,
              private loggingService: LoggingService) {
    this.log = loggingService.getLogger('EventsService');
    this.log.debug(`Construtor`);
  }

  save(event: Event):void {
      this.events.push(event);
      this.eventsChanged.next(this.events);
  }
}

export const EVENT_PROVIDERS:any[] = [
  { provide: EventsService, useClass: EventsService}];
