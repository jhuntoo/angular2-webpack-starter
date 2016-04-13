import {Component, ViewChild, HostBinding, OnInit} from 'angular2/core';
import {Validators, FormBuilder, Control, ControlGroup} from 'angular2/common';
import {ControlMessages} from '../control-messages/control-messages';
import {AbstractControl} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {Router} from 'angular2/router';
import {Config} from '../../config/config';
import {SocialLogin, LocalStorage, Logger, LoggingService, SpinnerComponent, AuthenticationService, LoginResult, Modal} from '../common/index';
import {SeoService} from '../common/seo-service';


@Component({

  selector: 'login',
  viewProviders: [HTTP_PROVIDERS],
  providers: [ToastsManager, LoggingService, SocialLogin],
  directives: [ControlMessages, SpinnerComponent, Modal],
  styles: [require('./login.less').toString()],
  template: require('./login.html')
})
export class LoginForm implements OnInit {
  log:Logger;
  form:ControlGroup;
  email:Control = new Control('', Validators.required);
  password:Control = new Control('', Validators.required);
  googleLogin:string;
  isSubmitting:boolean = false;
  isNetworkError:boolean = false;
  invalidCredentials:boolean = false;
  alternativeProfiles:string[] = [];

  @ViewChild('modal') modal: Modal;
  @HostBinding('id') id = 'login-component'; // Used in protractor tests

  constructor(private fb:FormBuilder,
              private _router:Router,
              private authenticationService: AuthenticationService,
              public socialLogin: SocialLogin,
              private logginService:LoggingService,
              private seoService: SeoService
            ) {
    let log:Logger = logginService.getLogger('RegisterForm');

    this.log = log;
    this.form = fb.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
    this.seoService.setTitle('Login on MustRace');
  }

  onSubmit() {
    this.isSubmitting = true;
    this.invalidCredentials = false;
    this.log.debug('calling the login endpoint');
    this.authenticationService.login(this.email.value, this.password.value)
      .subscribe(
        (result: LoginResult) => this.applyLoginResult(result),
        err => this.applyRegisterError(err),
        () => this.log.debug('Random Quote Complete')
      );
  }

  applyLoginResult(result: LoginResult) {
        if (result.success) {
          this.log.debug('Login Successful');
          this._router.navigate(['Home']);
        } else {
          this.log.debug(`Login NOT Successful yet response was 200`);
          this.invalidCredentials = true;
        }
  }

  applyRegisterError(response) {
    var body = response.json();
    if (response.status === 401) {
      this.invalidCredentials = true;
      this.alternativeProfiles = body.alternativeProfiles;
      this.log.debug(`Login NOT Successful, alternative profiles: ${this.alternativeProfiles}`);
      this.modal.show();
    } else {
      this.log.error(`Login Error: ${JSON.stringify(body)}`);
      this.isNetworkError = true;
    }
    this.isSubmitting = false;
  }

}
