import {Directive, Component, Input} from 'angular2/core';
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Component({
  selector: 'menu-item-list',
  template: require('./menu-item-list.html')
})
export class MenuItemList {
  constructor() {
  }
}
