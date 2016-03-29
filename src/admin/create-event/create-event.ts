import {Component} from 'angular2/core';
import {Event} from './models/Event';
import {LoggingService, Logger} from '../../app/common/log';
import {CategoryList} from './category-list';
import {EventLocation} from './event-location';

@Component({
  selector: 'create-event',  // <home></home>
  directives: [
    CategoryList, EventLocation
  ],
  template: require('./create-event.html')
})
export class CreateEvent {

  public event: Event = new Event();
  log:Logger;
  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CreateEvent');
  }

  save() {
      this.log.debug(`Save event: ${JSON.stringify(this.event)}`);
  }


  ngOnInit() {
    console.log('hello `CreateEvent` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
