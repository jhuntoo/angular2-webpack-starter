import {Component, Input, ChangeDetectionStrategy, ViewChild, ContentChild} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {EventCategory} from '../models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {CategoryItem} from './category-item';
//import { TAB_DIRECTIVES } from '../../app/temp/tabs';
import {SportService} from '../../common/sport/sport-service';
import {Sport} from '../models/Sport';
import {Tabset, TAB_DIRECTIVES} from '../../app/temp/tabs';
//import {TAB_DIRECTIVES, Tabset} from 'ng2-bootstrap/ng2-bootstrap';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'category-list',  // <home></home>
  styles: [`

   `],
  directives: [
    CategoryItem, TAB_DIRECTIVES, NgClass
  ],
  template: require('./category-list.html')
})
export class CategoryList {

  @Input() categories: EventCategory[];
  @ViewChild(Tabset) tabSet : Tabset;

  log:Logger;
  constructor(private logginService: LoggingService,
              private sportService: SportService) {
    this.log = logginService.getLogger('CategoryList');
  }

  addCategory() {
     let newEventCategory = new EventCategory();
     if (this.categories.length > 0) {
        let lastCateogory = this.categories[this.categories.length - 1];
        newEventCategory.sportId = lastCateogory.sportId;
        newEventCategory.registrationClosureDate = lastCateogory.registrationClosureDate;
     }

     this.categories.push(newEventCategory);
     this.log.debug(`categories: ${JSON.stringify(this.categories)}`);
  }

  removeTabHandler(eventCategory: EventCategory) {
    this.categories = this.categories.filter((ec: EventCategory) => ec.key !== eventCategory.key);
  }

}


//class EditItem<T> {
//  item: T;
//  editing: boolean
//  constructor (public item T) { }
//}
