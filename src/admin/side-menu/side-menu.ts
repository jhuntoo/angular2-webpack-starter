import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MenuItem} from './directives/menu-item';
import {MenuItemList} from './directives/menu-item-list';
import {SubItem} from './directives/sub-item';

import { CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'side-menu',
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [ ],
  pipes: [],
  //directives: [MenuItem, MenuItemList, SubItem],
  template: require('./side-menu.html')

})
export class SideMenu {

  public isFolded: boolean;
  @Output() isFoldedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public oneAtATime:boolean = true;

  public status:Object = {
    isFirstOpen: false,
    isFirstDisabled: false
  };
  constructor() {

  }

  public onMenuButtonClicked() {
    this.isFolded = !this.isFolded;
    this.isFoldedChanged.emit(this.isFolded);
  }
}

