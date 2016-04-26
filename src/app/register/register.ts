import {Component, HostBinding} from 'angular2/core';
import {Validators, FormBuilder, Control, ControlGroup} from 'angular2/common';
import {ControlMessages} from '../control-messages/control-messages';
import {AbstractControl} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {EmailCheckResult} from './models/EmailCheckResult';
import {RegisterResponse} from './models/registerResponse';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Response} from 'angular2/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {RegistrationService} from './services/registration.service';
import {Logger, LoggingService} from '../common/log';
import {Router} from 'angular2/router';
import {LocalStorage, SocialLogin, AuthenticationService, SpinnerComponent} from '../common/index';
import {Config} from '../../config/config';
import {SeoService} from '../common/seo-service';

@Component({

  selector: 'register',
  viewProviders: [HTTP_PROVIDERS],
  providers: [RegistrationService, LoggingService, SocialLogin],
  directives: [ ControlMessages, SpinnerComponent],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./register.less').toString()],
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
  googleLogin:string;
  isCheckingEmail:boolean = false;
  isSubmitting:boolean = false;
  isNetworkError:boolean = false;

  emailCheckResult:EmailCheckResult = null;
  startEmailCheck$:Subject<string>;

  @HostBinding('id') id = 'register-component'; // Used in protractor tests

  constructor(private fb:FormBuilder,
              private _router: Router,
              private http:Http,
              public socialLogin: SocialLogin,
              private registrationService: RegistrationService,
              private authenticationService: AuthenticationService,
              private loggingService: LoggingService,
              private config:Config,
              private seoService: SeoService) {
    let log : Logger = loggingService.getLogger('RegisterForm');
    log.debug('Constructor called');

    this.log = log;
    this.form = fb.group({
      email: this.email,
      matchingPassword: fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword
      }, {validator: ValidationService.passwordsDoNotMatch})
    });

    this.startEmailCheck$ = new Subject<string>();
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
    this.log.debug('Init');
    this.seoService.setTitle('Register with MustRace');
  }

  onSubmit() {
    this.isSubmitting = true;
    this.isNetworkError = false;
    this.log.debug('calling the register endpoint');
    this.registrationService.register(this.email.value, this.password.value)
      .subscribe(
        (response: RegisterResponse) => this.applyRegisterReponse(response),
        err => this.applyRegisterError(err),
        () => this.log.debug('Register Complete')
      );
  }

  applyRegisterReponse(response: RegisterResponse) {
    this.isSubmitting = false;
    if (response.success) {
      this.log.debug(`Registration Success. Email sent: ${response.confirmEmail}`);
      //this._localStorage.set('jwt', response.jwt)
      this.authenticationService.setToken(response.jwt);
      if (response.confirmEmail) {
        this._router.navigate(['WelcomePage', { emailSent: true}]);
      } else {
        this._router.navigate(['Home']);
      }
    } else {
      if (response.alreadyExists) {
        this.emailCheckResult = EmailCheckResult.taken();
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
