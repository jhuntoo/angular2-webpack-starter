import {Component} from 'angular2/core';
import {Validators, FormBuilder, Control, ControlGroup} from 'angular2/common';
import {Alert, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ControlMessages} from '../control-messages/control-messages';
import {AbstractControl} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {EmailCheckResult} from './models/EmailCheckResult';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Response} from 'angular2/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Subject} from "rxjs/Subject";

import {RegistrationService} from './services/registration.service';

@Component({

  selector: 'register',
  viewProviders: [HTTP_PROVIDERS],
  providers: [ToastsManager, RegistrationService],
  directives: [

    Alert, DATEPICKER_DIRECTIVES, ControlMessages
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./register.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./register.html')
})
export class RegisterForm {
  form:ControlGroup;
  email:Control = new Control('',
    Validators.compose([
      Validators.required,
      ValidationService.emailValidator,
      this.emailTakenValidator.bind(this)]));
  password:Control = new Control('',
    Validators.compose([
      Validators.required,
      ValidationService.passwordValidator]));
  confirmPassword = new Control('', Validators.required);
  checkingEmail:boolean = false;
  emailCheckResult:EmailCheckResult = null;
  startEmailCheck$:Subject<string>;

  constructor(fb:FormBuilder, private http:Http, public toastr:ToastsManager, private registrationService: RegistrationService) {
    this.form = fb.group({
      email: this.email,
      matchingPassword: fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {validator: ValidationService.passwordsDoNotMatch})
    });

    //this.startEmailCheck$ = new Subject();
    //this.email.valueChanges
    //    //.debounceTime(200)
    //    //.distinctUntilChanged()
    //    .flatMap((email:string) => this.registrationService.checkEmail(email))
    //      .subscribe(
    //        (result: EmailCheckResult) => this.applyResult(result),
    //        err => {this.toastr.error(JSON.stringify(err)); },
    //        () => console.log('checkEmail Finished')
    //      );
         //.subscribe((email: string) => {this.checkEmail(email);},
         //     error => console.log('Error startEmailCheck$'));

  }


  ngOnInit() {
    console.log('hello `register` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  onSubmit() {
    let request = {email: this.email.value, password: this.password.value};
    this.http.post('http://52.50.10.205/api/v1/auth/register', JSON.stringify(request))
      .map((res:Response) => res.json())
      .subscribe(
        data => this.applyReponse(data),
        err => this.toastr.error(JSON.stringify(err)),
        () => console.log('Random Quote Complete')
      );
  }

  applyReponse(data) {
    if (data.success) {

    } else {
      if (data.exists) {
      }
    }
  }

  emailTakenValidator(control:Control) {
    console.log('emailTakenValidator');
    if (!this.isAValidEmail(control)) {
      this.emailCheckResult = null;
      return null;
    }
    this.startEmailCheck$.next(control.value);

  }

  //checkEmail(email:string) {
  //  console.log('checkEmail called');
  //  this.checkingEmail = true;
  //
  //  this.registrationService.checkEmail(email)
  //    .subscribe(
  //      result => this.applyResult(result),
  //      err => {this.toastr.error(JSON.stringify(err)); this.applyResult()},
  //      () => console.log('checkEmail Finished')
  //    );
  //}

  applyResult(result?:EmailCheckResult) {
    console.log('applyResult');
    this.emailCheckResult = result;
  }

  isAValidEmail(control:Control) {
    return ValidationService.emailValidator(control) == null;
  }

}
