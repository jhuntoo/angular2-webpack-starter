import {Component, Output, EventEmitter, OnInit} from 'angular2/core';

@Component({
  selector: 'admin-header',  // <home></home>
  styles: [require('./header.scss').toString()],
  template: require('./header.html')
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggleChanged : EventEmitter<boolean> = new EventEmitter<boolean>();

  public isSideMenuCollapsed:boolean;

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Admin Header` component');
  }

  toggle() {
    this.isSideMenuCollapsed = !this.isSideMenuCollapsed;
    this.toggleChanged.emit(this.isSideMenuCollapsed);
  }

}
