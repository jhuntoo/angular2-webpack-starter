import {Component} from '@angular/core';
import {Event} from '../models/Event';
import {LoggingService, Logger} from '../../app/common/log';
import {CategoryList} from './category-list';
import {EventLocation} from './event-location';
import {DateInputDirective} from '../../common/date-input';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
//import {DatePicker} from '../common/date-picker';
//import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'create-event',  // <home></home>
  directives: [
    CategoryList, DateInputDirective, EventLocation
  ],
  styles: [require('./create-event.less').toString()],

  template: require('./create-event.html')
})
export class CreateEvent {

  public event: Event = new Event();
  log:Logger;
  showPicker: boolean = false;

  form: ControlGroup;
  summary: ControlGroup;
  locationGroup: ControlGroup;
  sponsorship: ControlGroup;
  name: Control;
  description: Control;
  location: Control;
  sponsorshipEnabled: Control;
  constructor(logginService: LoggingService, private fb:FormBuilder) {
    this.log = logginService.getLogger('CreateEvent');

    this.name = new Control('', Validators.required);
    this.description = new Control('', Validators.required);
    this.sponsorshipEnabled = new Control('', Validators.required);

    this.summary = this.fb.group({
      name: this.name,
      description: this.description,
    });
    this.locationGroup = this.fb.group({
      location: this.location
    });
    this.sponsorship = this.fb.group({
      enabled: this.sponsorshipEnabled
    });
    this.form = this.fb.group({
      summary: this.summary,
      location: this.locationGroup,
      sponsorship: this.sponsorship
    });


  }

  save() {
      this.log.debug(`Save event: ${JSON.stringify(this.event)}`);
  }


  ngOnInit() {
    console.log('hello `CreateEvent` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
  toggleDatePicker(event) {
     this.showPicker = !this.showPicker;
  }

}
