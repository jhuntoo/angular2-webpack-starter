import {Component} from 'angular2/core';

@Component({
  selector: 'admin-home',  // <home></home>
  styles: [ require('./home.less').toString() ],
  template: require('./home.html')
})
export class Home {
  constructor() {

  }



  ngOnInit() {
    console.log('hello `Admin Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
