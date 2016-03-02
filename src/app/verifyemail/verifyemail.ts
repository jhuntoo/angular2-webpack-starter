import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, RouteConfig} from 'angular2/router';

@Component({

  selector: 'verifyemail',
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./verifyemail.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./verifyemail.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class VerifyEmail {
  code: string;

  constructor(params: RouteParams) {
    this.code = params.get('code');
  }

  ngOnInit() {
    console.log('hello `VerifyEmail` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
