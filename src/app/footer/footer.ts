import {Component} from 'angular2/core';
import {PageScroll} from 'ng2-page-scroll/ng2-page-scroll';
@Component({
  selector: 'app-footer',
  directives: [PageScroll],
  styles: [require('./footer.less').toString()],
  template: require('./footer.html')
})
export class Footer {
  constructor() {
  }
}
