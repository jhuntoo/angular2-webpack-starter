import {Injectable, provide} from 'angular2/core';
import {Config} from '../../config/config';
import {Subject} from 'rxjs/Subject';
import {LocalStorage} from './local-storage';
import {Http} from 'angular2/http';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


export class SocialLoginResult {
  constructor(public success: boolean,
              public type: string,
              public jwt?: string) {
  }

  static success(jwt: string, type:string) : SocialLoginResult {
    return new SocialLoginResult(true, type, jwt);
  }

  static error() : SocialLoginResult {
    return new SocialLoginResult(false, null, null);
  }
}

export class LoginResult {
  constructor(public success: boolean,
              public error: boolean,
              public jwt?: string,
              public alternativeProfiles?: string[]) {

  }

  static success(jwt: string) : LoginResult {
    return new LoginResult(true, false, jwt, null);
  }

  static invalid(alternativeProfiles: string[]) : LoginResult {
    return new LoginResult(false, false, null, alternativeProfiles);
  }

  static error() : LoginResult {
    return new LoginResult(false, true, null, null);
  }
}

@Injectable()
export class AuthenticationService {

  public $loginStatusChanged:Subject<boolean> = new Subject<boolean>();
  public isLoggedIn:boolean = false;

  constructor(private http:Http, private config:Config, private localStorage:LocalStorage) {
     let jwt = localStorage.get('jwt');
     if (jwt) {
        this.isLoggedIn = true;
     } else {
       this.isLoggedIn = false;
     }
  }

  completeSocialLogin(loginCompletionId: string) {
    return this.http.post(`${this.config.apiBaseUrl}/auth/login/complete`, JSON.stringify({ id : loginCompletionId}))
      .timeout(10000, '/auth/login/complete timed out')
      .map((response:Response) => this.toSocialLoginResult(response))
      .do((result: SocialLoginResult) => this.updateWithSocialLogin(result));
  }

  login(email: string, password) : Observable<LoginResult> {
    return this.http.post(`${this.config.apiBaseUrl}/auth/login`, JSON.stringify({ email : email, password : password}))
      .timeout(10000, '/auth/login timed out')
      .map((response:Response) => this.toLoginResult(response))
      .do((result: LoginResult) => this.updateWithLogin(result));
  }

  verifyEmail(code: string) : Observable<boolean> {
    return this.http.post(`${this.config.apiBaseUrl}/auth/verify_email_code`, JSON.stringify({ code : code }))
      .timeout(10000, '/auth/verify_email_code timed out')
      .map((response:Response) => { return (response.status === 200 && response.json().success)});
  }

  setToken(token:string) {
    //console.log(`setToken: ${token}`);
    if (!token || token.length === 0) {
      return;
    }
    this.localStorage.set('jwt', token);
    this.updateLoggedInStatus(true);
  }

  logout() {
    this.localStorage.remove('jwt');
    this.updateLoggedInStatus(false);
  }

  private updateLoggedInStatus(value:boolean) {
    this.isLoggedIn = value;
    this.$loginStatusChanged.next(value);
  }



  private updateWithSocialLogin(socialLoginResult: SocialLoginResult) {
    //console.log(`socialLoginResult: ${JSON.stringify(socialLoginResult)}`);
    if (socialLoginResult.success) {
      this.setToken(socialLoginResult.jwt);
    }
  }

  private updateWithLogin(loginResult: LoginResult) {
    //console.log(`socialLoginResult: ${JSON.stringify(socialLoginResult)}`);
    if (loginResult.success) {
      this.setToken(loginResult.jwt);
    }
  }

  private toLoginResult(response:Response):LoginResult {
    if (response.status !== 200 && response.status !== 401) return LoginResult.error();
    var body = response.json();
    if (body.token && body.success) {
      return LoginResult.success(body.token);
    } else {
      return LoginResult.invalid(body.alternativeProfiles);
    }
  }


  private toSocialLoginResult(response:Response):SocialLoginResult {
    if (response.status !== 200) return SocialLoginResult.error();
    var body = response.json();
    if (body.token) {
      return SocialLoginResult.success(body.token, body.type);
    } else if (body.exists) {
      return SocialLoginResult.error();
    }
  }

}
@Injectable()
export class MockAuthenticationService {

  public $loginStatusChanged:Subject<boolean> = new Subject<boolean>();
  public isLoggedIn:boolean = false;



  completeSocialLogin(loginCompletionId: string) {
    return null;
  }

  login(email: string, password) : Observable<LoginResult> {
    return null;
  }

  setToken(token:string) {
  }

  logout() {
  }
}
export const AUTHENTICATION_PROVIDERS:any[] = [
  provide(AuthenticationService, {useClass: AuthenticationService})
];
