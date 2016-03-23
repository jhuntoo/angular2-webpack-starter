import {Injectable, provide} from 'angular2/core';
import {Config} from '../../config/config';
import {Subject} from 'rxjs/Subject';
import {LocalStorage} from './local-storage';
import {Http} from 'angular2/http';
import {Response} from 'angular2/http';


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

@Injectable()
export class AuthenticationService {

  public $loginStatusChanged:Subject<boolean> = new Subject<boolean>();
  public isLoggedIn:boolean = false;

  constructor(private http:Http, private config:Config, private localStorage:LocalStorage) {

  }

  completeSocialLogin(loginCompletionId: string) {
    return this.http.post(`${this.config.apiBaseUrl}/auth/login/complete`, JSON.stringify({ id : loginCompletionId}))
      .timeout(10000, '/auth/login/complete timed out')
      .map((response:Response) => this.toSocialLoginResult(response))
      .do((result: SocialLoginResult) => this.update(result));
  }

  setToken(token:string) {
    //console.log(`setToken: ${token}`);
    if (!token || token.length === 0) {
      return;
    }
    this.localStorage.set('jwt', token);
    this.isLoggedIn = true;
    this.$loginStatusChanged.next(true);
  }
  private update(socialLoginResult: SocialLoginResult) {
    //console.log(`socialLoginResult: ${JSON.stringify(socialLoginResult)}`);
    if (socialLoginResult.success) {
      this.setToken(socialLoginResult.jwt);
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
export const AUTHENTICATION_PROVIDERS:any[] = [
  provide(AuthenticationService, {useClass: AuthenticationService})
];
