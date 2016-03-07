import {Component} from 'angular2/core';
import {Validators, FormBuilder, Control, ControlGroup} from 'angular2/common';
import {Alert, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ControlMessages} from '../control-messages/control-messages';
import {AbstractControl} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {EmailCheckResult} from './models/EmailCheckResult';
import {RegisterResponse} from './models/registerResponse';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Response} from 'angular2/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Subject} from 'rxjs/Subject';

import {RegistrationService} from './services/registration.service';
import {Logger, LoggingService} from '../common/log';
import {SpinnerComponent} from '../common/spinner/spinner';

@Component({

  selector: 'register',
  viewProviders: [HTTP_PROVIDERS],
  providers: [ToastsManager, RegistrationService, LoggingService],
  directives: [ Alert, DATEPICKER_DIRECTIVES, ControlMessages, SpinnerComponent],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./register.css').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./register.html')
})
export class RegisterForm {
  log:Logger;
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
  isCheckingEmail:boolean = false;
  isSubmitting:boolean = false;
  isNetworkError:boolean = false;

  emailCheckResult:EmailCheckResult = null;
  startEmailCheck$:Subject<string>;

  constructor(fb:FormBuilder, private http:Http, public toastr:ToastsManager, private registrationService: RegistrationService, logginService: LoggingService) {
    let log : Logger = logginService.getLogger('RegisterForm');

    this.log = log;

    this.form = fb.group({
      email: this.email,
      matchingPassword: fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {validator: ValidationService.passwordsDoNotMatch})
    });

    this.startEmailCheck$ = new Subject();
    this.startEmailCheck$
            .debounceTime(200)
           .distinctUntilChanged()
          .flatMap((email:string) => this.registrationService.checkEmail(email))
          .subscribe(
            (result: EmailCheckResult) => this.applyResult(result),
            err => {log.error(JSON.stringify(err)); },
            () => log.debug('checkEmail Finished')
          );
         //.subscribe((email: string) => {this.checkEmail(email);},
         //     error => console.log('Error startEmailCheck$'));

  }


  ngOnInit() {
    this.log.debug('hello `register` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  onSubmit() {
    this.isSubmitting = true;
    this.log.debug('calling the register endpoint');
    this.registrationService.register(this.email.value, this.password.value)
      .subscribe(
        (response: RegisterResponse) => this.applyRegisterReponse(response),
        err => this.applyRegisterError(err),
        () => this.log.debug('Random Quote Complete')
      );
  }

  applyRegisterReponse(response: RegisterResponse) {
    this.isSubmitting = false;
    if (response.success) {
      this.log.debug('success');
    } else {
      if (response.alreadyExists) {
        this.log.debug('exists');
      }
    }
  }

  applyRegisterError(err) {
    this.log.error('/register endpoint unreachable');
    this.isSubmitting = false;
    this.isNetworkError = true;
  }

  emailTakenValidator(control:Control) {
    //this.log.debug('emailTakenValidator');
    if (!this.isAValidEmail(control)) {
      this.emailCheckResult = null;
      return null;
    }
    this.startEmailCheck$.next(control.value);

  }

  //checkEmail(email:string) {
  //  console.log('checkEmail called');
  //  this.isCheckingEmail = true;
  //
  //  this.registrationService.checkEmail(email)
  //    .subscribe(
  //      result => this.applyResult(result),
  //      err => {this.toastr.error(JSON.stringify(err)); this.applyResult()},
  //      () => console.log('checkEmail Finished')
  //    );
  //}

  applyResult(result?:EmailCheckResult) {
    this.log.debug('applyResult');
    this.emailCheckResult = result;
  }

  isAValidEmail(control:Control) {
    return ValidationService.emailValidator(control) == null;
  }

}
