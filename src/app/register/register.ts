import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';

@Component({
  directives: [ FORM_DIRECTIVES ],
  providers: [ ],
  pipes: [],
  styles: [ require('./register.css') ],
  template: require('./register.html')
})
export class Register implements OnInit {

  public email : string;
  public password : string;
  constructor(
    private _router: Router,
    public http: Http) {}


  submit() {
    console.log('Submit');
  }

  ngOnInit() {
    console.log('Init');
  }


}

