import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';


@Component({

  selector: 'navbar',

  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./navbar.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./navbar.html')
})
export class Navbar {
  data = { value: '' };
  constructor() {

  }

  ngOnInit() {
    console.log('hello `navbar` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
