import {Component, Input} from 'angular2/core';
import {EventCategory} from './models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';

@Component({
  selector: 'category-item',  // <home></home>
  template: require('./category-item.html')
})
export class CategoryItem {

  @Input() model: EventCategory;
  log:Logger;
  editing: boolean = false;
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
