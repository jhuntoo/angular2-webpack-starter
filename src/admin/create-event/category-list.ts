import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {EventCategory} from './models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {CategoryItem} from './category-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'category-list',  // <home></home>
  directives: [
    CategoryItem
  ],
  template: require('./category-list.html')
})
export class CategoryList {

  @Input() categories: EventCategory[];
  log:Logger;
  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryList');
  }


  add() {
     let newEventCategory = new EventCategory();
     if (this.categories.length > 0) {
        let lastCateogory = this.categories[this.categories.length - 1];
        newEventCategory.sportId = lastCateogory.sportId;
        newEventCategory.registrationClosureDate = lastCateogory.registrationClosureDate;
     }

     this.categories.push(newEventCategory);
     this.log.debug(`categories: ${JSON.stringify(this.categories)}`);
  }

}


//class EditItem<T> {
//  item: T;
//  editing: boolean
//  constructor (public item T) { }
//}
