import {Component, Input} from 'angular2/core';
import {EventCategory} from './models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {Select} from 'ng2-select/ng2-select';
import {RegistrationTypeList} from './registration-type-list';

@Component({
  selector: 'category-item',  // <home></home>
  directives: [Select, RegistrationTypeList],
  template: require('./category-item.html')
})
export class CategoryItem {

  @Input() model: EventCategory;
  log:Logger;
  editing: boolean = false;

  items: any[] = [
{id: '1', text: 'Running'},
{id: '2', text: 'Obstacle'},
{id: '3', text: 'Road Cycling'},
{id: '4', text: 'Mountain Biking'},
{id: '5', text: 'Swimming'},
{   id: '6', text: 'Triathlon'},
{   id: '7', text: 'Duathlon'},
{   id: '8', text: 'Aquathlon'},
{   id: '9', text: 'Adventure Race'},
{   id: '10', text: 'Childrens'},
{   id: '11', text: 'Multisport'}
  ];

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
