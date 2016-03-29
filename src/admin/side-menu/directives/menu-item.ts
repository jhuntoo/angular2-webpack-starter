import {Directive, Component, Input, ContentChildren, QueryList} from 'angular2/core';
import {SubItem} from './sub-item';
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Component({
  selector: 'menu-item',
  template: require('./menu-item.html')
})
export class MenuItem {
  public isCollapsed:boolean = false;
  @Input() title: string;
  @Input() iconClass: string;
  @ContentChildren(SubItem) subItems: QueryList<SubItem>;
  public toggleIcon:string;
  public menuIsFolded:boolean;
  constructor() {
    this.setCollapsed(true);
  }
  setCollapsed(collapsed:boolean) {
    //console.log(`Collapsed = ${collapsed}, children: ${JSON.stringify(this.subItems)}`);
    if (collapsed) {
      this.toggleIcon = 'fa-angle-right';
    } else {
      this.toggleIcon = 'fa-angle-down';
    }
    this.isCollapsed = collapsed;
  }
  toggle() {
    this.setCollapsed(!this.isCollapsed);
  }
}
