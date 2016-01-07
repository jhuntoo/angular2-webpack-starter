import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from './providers/title';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',  // <home></home>
  providers: [ Title   ],
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  styles: [ require('./home.css') ],
  template: require('./home.html')
})
export class Home {
  // TypeScript public modifiers
  constructor(public title: Title, public http: Http) {

  }

  ngOnInit() {
    console.log('hello Home component');
  }

}
