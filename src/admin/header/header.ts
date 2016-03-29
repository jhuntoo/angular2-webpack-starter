import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'admin-header',  // <home></home>
  template: require('./header.html')
})
export class AdminHeader {
  @Output() toggleChanged = new EventEmitter();

  public isSideMenuCollapsed:boolean;

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Admin Header` component');
  }

  toggle() {
    this.isSideMenuCollapsed = !this.isSideMenuCollapsed;
    this.toggleChanged.emit({value: this.isSideMenuCollapsed});
  }

}
