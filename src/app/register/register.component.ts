import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'register',
  template: `
    <h2>Register with Homely</h2>

    <form>
        <fieldset class="form-group">
          <label for="inputId">Email</label>
          <input [(ngModel)]="email" type="text" class="form-control" id="inputEmail" disabled>
        </fieldset>
        <fieldset class="form-group">
          <label for="inputName">Password</label>
          <input [(ngModel)]="password" type="password" class="form-control" id="inputPassword">
        </fieldset>
      </form>
      <button class="btn btn-success-outline" (click)="submit()">Register</button>
  `
})
export class RegisterComponent implements OnInit {

  public email : string;
  public password : string;
  constructor(
    private _router: Router) {}


  submit() {
    console.log('Submit')
  }

  ngOnInit() {
    console.log('Init')
  }


}

