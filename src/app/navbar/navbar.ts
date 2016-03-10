import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
  Collapse,
  DROPDOWN_DIRECTIVES,
} from 'ng2-bootstrap';

@Component({

  selector: 'navbar',
  directives: [
    Collapse,
    DROPDOWN_DIRECTIVES
  ],
  styles: [ require('./navbar.less').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./navbar.html')
})
export class Navbar {
  public isCollapsed:boolean = true;
  constructor() {

  }

  ngOnInit() {
    console.log('hello `navbar` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
