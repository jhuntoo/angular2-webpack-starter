import {Component, Input} from 'angular2/core';
import {MenuItem} from './directives/menu-item';
import {MenuItemList} from './directives/menu-item-list';
import {SubItem} from './directives/sub-item';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'side-menu',
  providers: [ ],
  pipes: [],
  directives: [MenuItem, MenuItemList, SubItem],
  template: require('./side-menu.html')

})
export class SideMenu {

  @Input() isFolded: boolean;
  constructor() {

  }


}

